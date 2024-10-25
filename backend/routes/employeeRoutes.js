const router = require("express").Router();
const {
  createEmployee,
  getEmployee,
} = require("../controllers/employeeController");

router.post("/create", createEmployee);
router.get("/:id", getEmployee);

module.exports = router;
