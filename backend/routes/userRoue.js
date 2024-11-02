const express = require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword } = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/logout').get(logout)
// This is not working 
router.route("/password/forget").post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword);
module.exports = router;

// http://localhost:5000/api/v1/password/reset/
// reset password token is not working 
