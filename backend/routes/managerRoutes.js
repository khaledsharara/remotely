const router = require("express").Router();
const {
  addTask,
  createManager,
  getMyEmployees,
} = require("../controllers/managerController");

router.post("/add-task", addTask);
router.post("/create", createManager);
router.get("/employees", getMyEmployees);

module.exports = router;
