const router = require("express").Router();
const {
  createEmployee,
  getEmployee,
  getAllEmployees,
  getEmployeeTasks,
  getTaskById,
  updateTaskChecklist,
} = require("../controllers/employeeController");

router.get("/tasks", getEmployeeTasks);
router.put("/task/checklist", updateTaskChecklist);
router.get("/task", getTaskById);
router.post("/create", createEmployee);
router.get("/:id", getEmployee);
router.get("/", getAllEmployees);

module.exports = router;
