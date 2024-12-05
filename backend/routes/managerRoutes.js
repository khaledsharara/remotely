const router = require("express").Router();
const { addTask } = require("../controllers/managerController");

router.post("/:id/add-task", addTask);

module.exports = router;
