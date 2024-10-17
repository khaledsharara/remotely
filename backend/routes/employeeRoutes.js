const router = require("express").Router();
const { createEmployee } = require("../controllers/employeeController");

router.post("/create", createEmployee);

module.exports = router;
