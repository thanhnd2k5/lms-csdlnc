const mysql = require("mysql2");
const { isAutomaticFailoverEnabled, readState } = require("./dbRoleStore");

function isTrue(value) {
  return String(value).toLowerCase() === "true";
}

function shouldUseSsl(host, port) {
  const rawMode = String(process.env.DB_USE_SSL || "auto").toLowerCase();

  if (rawMode === "true") {
    return true;
  }

  if (rawMode === "false") {
    return false;
  }

  const normalizedHost = String(host || "").toLowerCase();
  const normalizedPort = Number(port) || 0;

  if (normalizedHost.includes("tidbcloud.com") || normalizedHost.includes("pingcap")) {
    return true;
  }

  if (normalizedPort === 4000) {
    return true;
  }

  return false;
}

function createPoolConfig(host, port) {
  const config = {
    host,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "lms",
    port: Number(port) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  if (shouldUseSsl(host, port)) {
    config.ssl = {
      minVersion: process.env.DB_SSL_MIN_VERSION || "TLSv1.2",
      rejectUnauthorized: !isTrue(process.env.DB_SSL_REJECT_UNAUTHORIZED_FALSE),
    };
  }

  return config;
}

function createPool(host, port) {
  return mysql.createPool(createPoolConfig(host, port));
}

function getConfiguredTargets() {
  return {
    active: {
      host: process.env.DB_WRITE_HOST || process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_WRITE_PORT || process.env.DB_PORT || 3306),
    },
    standby: {
      host: process.env.DB_READ_HOST || process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_READ_PORT || process.env.DB_PORT || 3306),
    },
  };
}

function normalizeQueryArgs(sql, values, callback) {
  if (typeof values === "function") {
    return { sql, values: [], callback: values };
  }

  return {
    sql,
    values: values || [],
    callback,
  };
}

function getSqlType(sql) {
  if (!sql || typeof sql !== "string") {
    return "write";
  }

  const withoutBlockComments = sql.trim().replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const firstWord = withoutBlockComments.split(/\s+/)[0]?.toUpperCase() || "";

  if (["SELECT", "SHOW", "DESCRIBE", "EXPLAIN"].includes(firstWord)) {
    return "read";
  }

  return "write";
}

class DbRouter {
  constructor() {
    this.readWriteSplitEnabled = isTrue(process.env.DB_ENABLE_READ_WRITE_SPLIT);
    this.readPool = null;
    this.writePool = null;
    this.currentReadTarget = null;
    this.currentWriteTarget = null;
    this.refreshReadPool();
    this.refreshWritePool();
  }

  getCurrentTopology() {
    if (!isAutomaticFailoverEnabled()) {
      return getConfiguredTargets();
    }

    const state = readState();
    const configured = getConfiguredTargets();

    return {
      active: {
        host: state.activeWriteHost || configured.active.host,
        port: Number(state.activeWritePort || configured.active.port),
      },
      standby: {
        host: state.standbyHost || configured.standby.host,
        port: Number(state.standbyPort || configured.standby.port),
      },
    };
  }

  refreshReadPool() {
    const topology = this.getCurrentTopology();
    const readTarget =
      topology.standby.host && topology.standby.port ? topology.standby : topology.active;
    const nextTarget = `${readTarget.host}:${readTarget.port}`;

    if (this.currentReadTarget === nextTarget && this.readPool) {
      return;
    }

    const nextReadPool = createPool(readTarget.host, readTarget.port);
    const previousReadPool = this.readPool;

    this.readPool = nextReadPool;
    this.currentReadTarget = nextTarget;

    if (previousReadPool) {
      previousReadPool.end(() => { });
    }
  }

  refreshWritePool() {
    const topology = this.getCurrentTopology();
    const nextTarget = `${topology.active.host}:${topology.active.port}`;

    if (this.currentWriteTarget === nextTarget && this.writePool) {
      return;
    }

    const nextWritePool = createPool(topology.active.host, topology.active.port);
    const previousWritePool = this.writePool;

    this.writePool = nextWritePool;
    this.currentWriteTarget = nextTarget;

    if (previousWritePool) {
      previousWritePool.end(() => { });
    }
  }

  selectPool(sql, options = {}) {
    if (!this.readWriteSplitEnabled) {
      return { pool: this.writePool, mode: "write" };
    }

    if (options.forcePrimary) {
      this.refreshWritePool();
      return { pool: this.writePool, mode: "write" };
    }

    const sqlType = getSqlType(sql);
    if (sqlType === "read") {
      this.refreshReadPool();
      return { pool: this.readPool, mode: "read" };
    }

    this.refreshWritePool();
    return { pool: this.writePool, mode: "write" };
  }

  query(sql, values, callback, options = {}) {
    const normalized = normalizeQueryArgs(sql, values, callback);
    const target = this.selectPool(normalized.sql, options);

    console.log(`[DB:${target.mode}] ${normalized.sql.trim().split("\n")[0]}`);
    return target.pool.query(normalized.sql, normalized.values, normalized.callback);
  }

  execute(sql, values, callback, options = {}) {
    const normalized = normalizeQueryArgs(sql, values, callback);
    const target = this.selectPool(normalized.sql, options);

    console.log(`[DB:${target.mode}] ${normalized.sql.trim().split("\n")[0]}`);
    return target.pool.execute(normalized.sql, normalized.values, normalized.callback);
  }

  getConnection(callback) {
    this.refreshWritePool();
    return this.writePool.getConnection(callback);
  }

  end(callback) {
    let pending = 2;
    const done = () => {
      pending -= 1;
      if (pending === 0 && typeof callback === "function") {
        callback();
      }
    };

    this.readPool.end(done);
    this.writePool.end(done);
  }
}

module.exports = {
  DbRouter,
  getSqlType,
};
