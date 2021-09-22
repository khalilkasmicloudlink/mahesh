const fs = require("fs");
const mongoose = require('mongoose');
const { validationResult} = require('express-validator')
const Video = require("../models/video");
const Course = require("../models/course")
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");


const HttpError = require('../models/http-error');


const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-south-1",
  });
  
  
  const uploadVideo = multer({
    storage: multerS3({
      s3,
      acl: "public-read",
      bucket: "hapusmvptest/videos",
    }),
  });

  exports.multerUploadVideo = uploadVideo.single("video");



const createVideo = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(
  //     new HttpError('Invalid inputs, please check.', 422)
  //   );
  // }

 

 const {
  body: { title, description, course },
  file: { location },
} = req;
console.log(req);
  const createdVideo =  new Video({
    videoUrl : location,
    title,
    description,
   // courseName : req.course,
   course : req.body.course,
    uploadedBy : req.profile
    
  });
 
  console.log(createdVideo)

  let user;
  try {
    user = await User.findById(req.profile._id);
  } catch (err) {
    const error = new HttpError(
      'Cant upload lecture , please try again.',
      500
    );
    return next(console.log(error));
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }
  // console.log(user);

   const courseId = req.body.course
  
  let courseName;
  try {
    courseName = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      // 'Uploading Lecture failed, please try again.',
      // 500
      console.log()
    );
    return next(error);
  }

  if (!courseName) {
    const error = new HttpError('Could not find course for provided id.', 404);
    return next(error);
  }

   console.log(courseName);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdVideo.save({ session: sess });
    courseName.lectures.push(createdVideo);
    await courseName.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating lecture failed, please try again.',
      400
    );
         return next(error);
        
  }
  
 
  res.status(201).json({ lecture: createdVideo });
};


 exports.createVideo = createVideo;






exports.videoById = (req, res, next, id) => {
    Video.findById(id)
      .populate("course")
      .exec((err, video) => {
        if (err || !video) {
          return res.status(400).json({
            error: "Video not found",
          });
        }
        req.video = video;
        next();
      });
  };