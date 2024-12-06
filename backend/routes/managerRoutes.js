const router = require("express").Router();
const {
  addTask,
  createManager,
  getMyEmployees,
  addChecklistItem,
  getTaskById,
} = require("../controllers/managerController");

router.post("/add-task", addTask);
router.post("/create", createManager);
router.get("/employees", getMyEmployees);

router.post("/add-checklist-item", addChecklistItem);
router.get("/task", getTaskById);

module.exports = router;
