const express = require("express");
const router = express.Router();

const { signup, login, signout, requireLogin } = require("../controllers/auth");

const { userSignupValidator, userLoginValidator } = require("../validator");

// User Auth ROutes
router.post("/signup", userSignupValidator, signup);
router.post("/login", userLoginValidator, login);
router.get("/signout", signout);



module.exports = router;
