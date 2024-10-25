const router = require("express").Router();
const { getUserInfo } = require("../controllers/authController");

router.post("/info", getUserInfo);

module.exports = router;
