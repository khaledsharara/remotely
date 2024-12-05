const router = require("express").Router();
const { addTask, createManager } = require("../controllers/managerController");

router.post("/:id/add-task", addTask);
router.post("/create", createManager);

module.exports = router;
