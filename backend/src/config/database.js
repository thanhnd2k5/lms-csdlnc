const mysql = require("mysql2");
require("dotenv").config();

// Tạo Pool nhưng đặt tên là db để "đánh lừa" các file khác
const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lms",
  port: Number(process.env.DB_PORT) || 3306,

  // Quan trọng: Fix lỗi SSL cho TiDB Cloud
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },

  // Cấu hình Pool (Tự động reconnect)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Kiểm tra kết nối nhanh (Không bắt buộc nhưng nên có để debug)
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Kết nối thất bại:", err.message);
  } else {
    console.log("✅ Database đã sẵn sàng (Dùng Pool + SSL)");
    connection.release();
  }
});

// Vẫn export tên là db
module.exports = db;
