const { validationResult } = require('express-validator');
const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token

const expressJwt = require("express-jwt"); // for authorization check
 const { errorHandler } = require("../helpers/dbErrorHandler");
const HttpError = require('../models/http-error');



// using promise
exports.signup = async (req, res , next) => {

  
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: 'Email is taken!'
        });
    const user = await new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Signup success! Please login.' });
};
 


exports.login = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id , role: user.role }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id ;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  let user = req.profile
  if (user.role !== "admin") {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

exports.isInst = (req, res, next) => {
  let user = req.profile
  if(user.role !== "inst") {
    return res.status(403).json({
      error : "Institute resource accesss denied"
     
    })
    
  }
  
  next();
}

