const router = require("express").Router();
const {
  addTask,
  createManager,
  getMyEmployees,
  addChecklistItem,
  getTaskById,
  getMyEmployeesTasks,
} = require("../controllers/managerController");

router.post("/add-task", addTask);
router.post("/create", createManager);
router.get("/employees", getMyEmployees);

router.post("/add-checklist-item", addChecklistItem);
router.get("/task", getTaskById);
router.get("/tasks", getMyEmployeesTasks);

module.exports = router;
