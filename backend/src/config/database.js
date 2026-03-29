const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lms",
  port: Number(process.env.DB_PORT) || 3306,
  connectTimeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

function handleDisconnect() {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log("Connected to the database");
  });

  db.on("error", function (err) {
    console.error("Database error:", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNRESET" ||
      err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"
    ) {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
