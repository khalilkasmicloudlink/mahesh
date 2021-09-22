const express = require("express");
const router = express.Router();

const {
  createVideo,
  videoById,  
  multerUploadVideo
   
} = require("../controllers/video");
const { courseById, isCreatorOfCourse } = require("../controllers/course")
const {
  requireLogin,
  isAuth,
  isAdmin,
  isInst,
} = require("../controllers/auth");
const { userById } = require("../controllers/user");




router.post(
  "/:userId/video/create",
  requireLogin,
    isAuth,
   isInst,
  // isCreatorOfCourse,
   multerUploadVideo,
  createVideo
);



router.param("userId", userById);
router.param("courseId", courseById);
router.param("videoId", videoById);

module.exports = router;
