const router = require("express").Router();
const {
  addTask,
  createManager,
  getMyEmployees,
  getTaskById,
  getMyEmployeesTasks,
  updateTaskChecklist,
  getEmployeeInfo,
  getEmployeeLogs,
  completeTask,
  generateAnalytics,
} = require("../controllers/managerController");

router.post("/add-task", addTask);
router.post("/create", createManager);
router.get("/employees", getMyEmployees);

router.get("/task", getTaskById);
router.get("/tasks", getMyEmployeesTasks);
router.put("/task/checklist", updateTaskChecklist);
router.get("/employee", getEmployeeInfo);
router.get("/employee/logs", getEmployeeLogs);
router.put("/task/complete", completeTask);
router.get("/analytics", generateAnalytics);

module.exports = router;
