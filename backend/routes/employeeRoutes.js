const router = require("express").Router();
const {
  createEmployee,
  getEmployee,
  getAllEmployees,
  getEmployeeTasks,
} = require("../controllers/employeeController");

router.get("/tasks", getEmployeeTasks);
router.post("/create", createEmployee);
router.get("/:id", getEmployee);
router.get("/", getAllEmployees);

module.exports = router;
