const mysql = require("mysql2/promise");

async function pingNode({ host, port, user, password, database, useSsl = false }) {
  let connection;

  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      ssl: useSsl
        ? {
            minVersion: process.env.DB_SSL_MIN_VERSION || "TLSv1.2",
            rejectUnauthorized: false,
          }
        : undefined,
      connectTimeout: 2000,
    });

    await connection.query("SELECT 1");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function runAdminSql({ host, port, user, password, statements, useSsl = false }) {
  let connection;

  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
      ssl: useSsl
        ? {
            minVersion: process.env.DB_SSL_MIN_VERSION || "TLSv1.2",
            rejectUnauthorized: false,
          }
        : undefined,
      connectTimeout: 3000,
    });

    await connection.query(statements);
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = {
  pingNode,
  runAdminSql,
};
