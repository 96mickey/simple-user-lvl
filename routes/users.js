const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const accessController = require("../controllers/accessController");
const router = express.Router();

router
  .post("/register", userController.register)
  .post("/login", userController.login);

router.use(auth.auth);

router.get("/student", auth.studentAuth, accessController.roleBasedStudent);
router.get("/teacher", auth.teacherAuth, accessController.roleBasedTeacher);
router.get("/admin", auth.adminAuth, accessController.roleBasedAdmin);
router.get(
  "/superadmin",
  auth.superadminAuth,
  accessController.roleBasedSuperadmin
);

module.exports = router;
