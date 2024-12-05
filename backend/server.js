const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");
require("dotenv").config();
const verifyToken = require("./middleware/authMiddleware");

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/managers", managerRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
