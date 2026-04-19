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
  // 1. CHỖ CẦN SỬA: Thêm SSL để TiDB cho phép kết nối
  ssl: {
    rejectUnauthorized: true,
  },
});

function handleDisconnect() {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      // Đợi 5 giây thay vì 2 giây để tránh spam kết nối lên Cloud
      setTimeout(handleDisconnect, 5000); 
      return;
    }
    console.log("Connected to the database (TiDB Cloud)");
  });

  db.on("error", function (err) {
    console.error("Database error:", err.message);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNRESET" ||
      err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR" ||
      err.code === 'ER_UNKNOWN_ERROR' // Lỗi SSL đôi khi rơi vào mã này
    ) {
      handleDisconnect();
    } else {
      // 2. CHỖ CẦN SỬA: Thay "throw err" bằng handleDisconnect() 
      // để server tự kết nối lại thay vì sập luôn app (crashed)
      handleDisconnect(); 
    }
  });
}

handleDisconnect();

module.exports = db;