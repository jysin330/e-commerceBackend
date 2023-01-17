const express = require("express");
const router = express.Router();
const { check } = require("express-validator")

const { signout, signup } = require("../controllers/authController")
router.post("/signup", [
    check("firstname", "name should be at least 3char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 10 char").isLength({ min: 10 })
], signup)
router.get("/signout", signout)
module.exports = router;