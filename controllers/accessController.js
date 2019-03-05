const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

const roleBasedSuperadmin = (req, res) => {
  res.status(200).success({}, "This route is for superadmin.");
};

const roleBasedAdmin = (req, res) => {
  res.status(200).success({}, "This route is for Admin.");
};

const roleBasedTeacher = (req, res) => {
  res.status(200).success({}, "This route is for teacher.");
};

const roleBasedStudent = (req, res) => {
  res.status(200).success({}, "This route is for student.");
};

module.exports = {
  roleBasedSuperadmin,
  roleBasedAdmin,
  roleBasedTeacher,
  roleBasedStudent
};
