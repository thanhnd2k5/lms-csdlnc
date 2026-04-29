require("dotenv").config();
const { DbRouter } = require("./dbRouter");
const { ensureStateFile, isAutomaticFailoverEnabled } = require("./dbRoleStore");

if (isAutomaticFailoverEnabled()) {
  ensureStateFile();
}

const db = new DbRouter();

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connection is ready");
    connection.release();
  }
});

module.exports = db;
