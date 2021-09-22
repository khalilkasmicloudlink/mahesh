const fs = require("fs");
const Course = require("../models/course");
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");





const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});


const uploadImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "hapusmvptest/videos",
  }),
});



exports.multerUploadImage = uploadImage.single("image");



exports.create = (req, res) => {
  const {
    body: { title, description, category , price},
    file: { location },
  } = req;

  const newCourse = Course.create({
    photoUrl: location,
    title,
    description,
    category,
    price,
    lecture: [],
    createdBy : req.profile._id
  });



   res.json(newCourse);
};


  exports.courseById = (req, res, next, id) => {
    Course.findById(id)
      .populate("category")
      .populate("lectures")
      .exec((err, course) => {
        if (err || !course) {
          return res.status(400).json({
            error: "Course not found",
          });
        }
        req.course = course;
        next();
      });
  };


  exports.read = (req, res) => {
    return res.json(req.course);
  };


  exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    // let limit = req.query.limit ? parseInt(req.query.limit) : 12;
  
    Course.find()
  
      .populate("category")
      .sort([[sortBy, order]])
  
      .exec((err, courses) => {
        if (err) {
          return res.status(400).json({
            error: "Course not found",
          });
        }
        res.json(courses);
      });
  };


  exports.coursesByInst = (req, res ) => {
    Course.find({ createdBy: req.profile._id })
      .populate("createdBy", "_id name")
      .select("_id title description price photoUrl category")
      .sort("_created")
      .exec((err, courses) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(courses);
      });
  };


  exports.isCreatorOfCourse = (req, res, next) => {
    let sameUser = req.course && req.auth && req.course.createdBy._id == req.auth._id && req.auth.role === 'inst'
    

    let isCreatorOfCourse = sameUser;

    if(!isCreatorOfCourse) {
      return res.status(403).json({
        error: "user is not authorized"
      })
    }
    next()
  } 


 


  