const router = require("express").Router();
const { getUserInfo, logUser } = require("../controllers/authController");

router.post("/info", getUserInfo);
router.post("/log", logUser);

module.exports = router;
