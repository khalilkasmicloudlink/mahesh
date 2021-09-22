const express = require("express");
const router = express.Router();

const { requireLogin, isAuth, isAdmin } = require("../controllers/auth");

const {
  userById,
  read,
  update,
  purchaseHistory,
} = require("../controllers/user");

router.get("/user/:userId", requireLogin, isAuth, read);
router.put("/user/:userId", requireLogin, isAuth, update);


router.param("userId", userById);

module.exports = router;
