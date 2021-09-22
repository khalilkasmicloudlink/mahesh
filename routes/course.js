const express = require("express");
const router = express.Router();

const {
  create,
  courseById,
  read,
  list,
  multerUploadImage,
  coursesByInst,
  isCreatorOfCourse,
} = require("../controllers/course");

const {
  requireLogin,
  isAuth,
  isAdmin,
  isInst,
} = require("../controllers/auth");
const { userById } = require("../controllers/user");




router.get("/course/:courseId", read);
router.post(
  "/:userId/course/create/",
  requireLogin,
  isAuth,
  isInst,
  multerUploadImage,
  create
);





router.get("/courses", list);
router.get("/courses/by/:userId", requireLogin, isInst,  coursesByInst);

router.param("userId", userById);
router.param("courseId", courseById);

module.exports = router;
