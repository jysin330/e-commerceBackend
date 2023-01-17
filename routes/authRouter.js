const express = require("express");
const router = express.Router();
const { check } = require("express-validator")

const { signout, signup, signin, isSignedIn } = require("../controllers/authController")
router.post("/signup", [
    check("firstname", "name should be at least 3char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 10 char").isLength({ min: 10 })
], signup)

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
], signin)

router.get("/signout", signout)

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("this is test  route")
})
module.exports = router;