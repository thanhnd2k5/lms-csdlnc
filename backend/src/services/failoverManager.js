const { pingNode, runAdminSql } = require("../config/dbHealth");
const { readState, writeState } = require("../config/dbRoleStore");

function isTrue(value) {
  return String(value).toLowerCase() === "true";
}

function getNodeConfig() {
  const useSsl = isTrue(process.env.DB_USE_SSL);
  const common = {
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "lms",
    useSsl,
  };

  return {
    primary: {
      host: process.env.DB_WRITE_HOST || process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_WRITE_PORT || process.env.DB_PORT || 3306),
      ...common,
    },
    replica: {
      host: process.env.DB_READ_HOST || process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_READ_PORT || process.env.DB_PORT || 3306),
      ...common,
    },
    admin: {
      user: process.env.DB_ADMIN_USER || process.env.DB_USER || "root",
      password: process.env.DB_ADMIN_PASSWORD || process.env.DB_PASSWORD || "",
      useSsl,
    },
  };
}

class FailoverManager {
  constructor() {
    this.intervalMs = Number(process.env.DB_HEALTHCHECK_INTERVAL_MS || 5000);
    this.failureThreshold = Number(process.env.DB_HEALTHCHECK_FAILURE_THRESHOLD || 3);
    this.enabled = isTrue(process.env.DB_ENABLE_AUTOMATIC_FAILOVER);
    this.failureCount = 0;
    this.timer = null;
    this.promoting = false;
  }

  async checkPrimary() {
    const state = readState();
    const nodes = getNodeConfig();
    const health = await pingNode({
      host: state.activeWriteHost,
      port: state.activeWritePort,
      user: nodes.primary.user,
      password: nodes.primary.password,
      database: nodes.primary.database,
      useSsl: nodes.primary.useSsl,
    });

    if (health.ok) {
      this.failureCount = 0;
      return;
    }

    this.failureCount += 1;
    console.error(
      `Primary health check failed (${this.failureCount}/${this.failureThreshold}): ${health.error}`,
    );

    if (this.failureCount >= this.failureThreshold) {
      await this.promoteReplica();
    }
  }

  async promoteReplica() {
    if (this.promoting) {
      return;
    }

    this.promoting = true;
    const nodes = getNodeConfig();

    try {
      const replicaHealth = await pingNode(nodes.replica);
      if (!replicaHealth.ok) {
        console.error(`Replica is not healthy enough for failover: ${replicaHealth.error}`);
        return;
      }

      const promoteResult = await runAdminSql({
        host: nodes.replica.host,
        port: nodes.replica.port,
        user: nodes.admin.user,
        password: nodes.admin.password,
        useSsl: nodes.admin.useSsl,
        statements: `
          STOP REPLICA;
          RESET REPLICA ALL;
          SET GLOBAL read_only = OFF;
          SET GLOBAL super_read_only = OFF;
        `,
      });

      if (!promoteResult.ok) {
        console.error(`Replica promotion failed: ${promoteResult.error}`);
        return;
      }

      const nextState = writeState({
        activeWriteHost: nodes.replica.host,
        activeWritePort: nodes.replica.port,
        lastFailoverAt: new Date().toISOString(),
      });

      this.failureCount = 0;
      console.log(
        `Automatic failover completed. New primary: ${nextState.activeWriteHost}:${nextState.activeWritePort}`,
      );
    } finally {
      this.promoting = false;
    }
  }

  start() {
    if (!this.enabled) {
      return;
    }

    console.log("Automatic failover manager is enabled");
    this.timer = setInterval(() => {
      this.checkPrimary().catch((error) => {
        console.error("Failover manager error:", error.message);
      });
    }, this.intervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

module.exports = new FailoverManager();
