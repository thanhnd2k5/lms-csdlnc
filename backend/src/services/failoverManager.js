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
    configuredPrimary: {
      host: process.env.DB_WRITE_HOST || process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_WRITE_PORT || process.env.DB_PORT || 3306),
      ...common,
    },
    configuredReplica: {
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

function getTopologyState() {
  const state = readState();
  const nodes = getNodeConfig();

  return {
    active: {
      host:
        state.activeWriteHost !== undefined
          ? state.activeWriteHost
          : nodes.configuredPrimary.host,
      port:
        state.activeWritePort !== undefined
          ? Number(state.activeWritePort)
          : nodes.configuredPrimary.port,
      user: nodes.configuredPrimary.user,
      password: nodes.configuredPrimary.password,
      database: nodes.configuredPrimary.database,
      useSsl: nodes.configuredPrimary.useSsl,
    },
    standby: {
      host:
        state.standbyHost !== undefined
          ? state.standbyHost
          : nodes.configuredReplica.host,
      port:
        state.standbyPort !== undefined
          ? (state.standbyPort === null ? null : Number(state.standbyPort))
          : nodes.configuredReplica.port,
      user: nodes.configuredReplica.user,
      password: nodes.configuredReplica.password,
      database: nodes.configuredReplica.database,
      useSsl: nodes.configuredReplica.useSsl,
    },
    admin: nodes.admin,
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
    const topology = getTopologyState();
    const health = await pingNode(topology.active);

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
    const topology = getTopologyState();

    try {
      const standbyHealth = await pingNode(topology.standby);
      if (!standbyHealth.ok) {
        console.error(`Standby node is not healthy enough for failover: ${standbyHealth.error}`);
        return;
      }

      const promoteResult = await runAdminSql({
        host: topology.standby.host,
        port: topology.standby.port,
        user: topology.admin.user,
        password: topology.admin.password,
        useSsl: topology.admin.useSsl,
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
        activeWriteHost: topology.standby.host,
        activeWritePort: topology.standby.port,
        standbyHost: null,
        standbyPort: null,
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
