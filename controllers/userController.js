const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

const register = async (req, res) => {
  const { error } = validateUser(req.body, "registerSchema");
  if (error) return res.status(400).failure(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).failure("User already registered.");

  user = new User(_.pick(req.body, ["email"]));

  let password = await makeid();
  console.log("pass", password);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  user.type = req.body.type;

  await user.save();
  let dataToSend = {};
  dataToSend._id = user._id;
  dataToSend.email = user.email;
  dataToSend.password = password;
  res.status(200).success(dataToSend, "Use this password to login.");
};

const login = async (req, res) => {
  const { error } = validateUser(req.body, "loginSchema");
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).failure("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).failure("Invalid email or password.");

  const token = user.generateAuthToken();
  res
    .status(200)
    .header({ "x-auth-token": token })
    .success(
      { name: user.name, email: user.email, _id: user._id, token },
      "User logged in successfully."
    );
};

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = {
  register,
  login
};
