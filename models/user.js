const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      unique: true,
      required: true
    },
    password: {
      type: String,
      minlength: 8,
      required: true
    },
    type: {
      type: String,
      enum: ["superadmin", "admin", "teacher", "student"],
      default: "student"
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, type: this.type },
    config.get("secret"),
    {
      expiresIn: "7d"
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user, schema) => {
  //Schema Values
  const email = Joi.string()
    .email({ minDomainAtoms: 2 })
    .min(5)
    .max(255)
    .required()
    .error(new Error("Please enter a valid email address."));
  const type = Joi.string()
    .valid("superadmin", "admin", "teacher", "student")
    .required()
    .error(new Error("Please enter a valid user type."));
  const password = Joi.string()
    .min(8)
    .required()
    .error(new Error("Please enter a valid password."));

  //JOI Schemas
  const schemas = {
    registerSchema: Joi.object().keys({
      email,
      type
    }),
    loginSchema: Joi.object().keys({
      email,
      password
    })
  };

  return Joi.validate(user, schemas[schema]);
};

module.exports = { User, validateUser };
