const router = require("express").Router();
const {
  createEmployee,
  getEmployee,
  getAllEmployees,
} = require("../controllers/employeeController");

router.post("/create", createEmployee);
router.get("/:id", getEmployee);
router.get("/", getAllEmployees);

module.exports = router;
