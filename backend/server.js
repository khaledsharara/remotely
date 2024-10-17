const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
