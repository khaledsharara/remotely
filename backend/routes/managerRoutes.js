const router = require("express").Router();
const {
  addTask,
  createManager,
  getMyEmployees,
  getTaskById,
  getMyEmployeesTasks,
  updateTaskChecklist,
} = require("../controllers/managerController");

router.post("/add-task", addTask);
router.post("/create", createManager);
router.get("/employees", getMyEmployees);

router.get("/task", getTaskById);
router.get("/tasks", getMyEmployeesTasks);
router.put("/task/checklist", updateTaskChecklist);

module.exports = router;
