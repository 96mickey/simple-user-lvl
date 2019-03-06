const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).failure("Access denied. No token found.");

  try {
    const decoded = jwt.verify(token, config.get("secret"));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Access denied. Invalid token");
  }
};

const superadminAuth = (req, res, next) => {
  if (req.user.type !== "superadmin")
    return res.status(401).failure("Access denied.");
  next();
};

const adminAuth = (req, res, next) => {
  if (req.user.type !== "admin")
    return res.status(401).failure("Access denied.");
  next();
};

const teacherAuth = (req, res, next) => {
  if (req.user.type !== "teacher")
    return res.status(401).failure("Access denied.");
  next();
};

const studentAuth = (req, res, next) => {
  if (req.user.type !== "student")
    return res.status(401).failure("Access denied.");
  next();
};

module.exports = { auth, superadminAuth, adminAuth, teacherAuth, studentAuth };
