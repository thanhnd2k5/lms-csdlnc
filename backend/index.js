const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const lmsRoutes = require("./src/routes/lmsRoutes");
const authRoutes = require("./src/routes/authRoutes");
const quizRoutes = require("./src/routes/quizRoutes");
const documentRoutes = require("./src/routes/documentRoutes");
const teacherRoutes = require("./src/routes/teacherRoutes");
const courseEnrollRoutes = require("./src/routes/courseEnrollRoutes");
const searchRoutes = require("./src/routes/searchRoutes");
const userRoutes = require("./src/routes/userRoutes");
const classRoutes = require("./src/routes/classRoutes");
const failoverManager = require("./src/services/failoverManager");
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(bodyParser.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/teacher", teacherRoutes);
app.use("/", lmsRoutes);
app.use("/", quizRoutes);
app.use("/", authRoutes);
app.use("/", documentRoutes);
app.use("/courseEnroll", courseEnrollRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/", classRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

failoverManager.start();
