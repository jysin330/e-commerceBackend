const User = require("../models/userModel")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const { expressjwt: expressJwt } = require("express-jwt");
// exports.signup = async (req, res) => {
//     const { firstname, lastname, email, password } = req.body;

//     const data = await User.create({
//         firstname, lastname, email, password
//     })
//     data.password = undefined
//     res.send(data);

// }

exports.signup = async (req, res) => {
    //  validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    //   create user
    const user = new User(req.body)
    await user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "not able to save user",

            })
        }
        res.status(200).json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user._id
        })
    })


}

exports.signin = async (req, res) => {
    const { email, password } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }
    User.findOne({ email }, (err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: "user email doesn't exist"
            })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "email and password donot match"
            })
        }
        // create token
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY);

        // put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 })

        // send response to frontend

        const { _id, firstname, lastname, email, role } = user;
        return res.json({ token, user: { _id, firstname, lastname, email, role } });

    })

}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout successfully"
    })
}


// protected route


exports.isSignedIn = expressJwt({
    secret: process.env.SECRET_KEY,
    userProperty: "auth",
    algorithms: ["HS256"]
})


// custom middileware

exports.isAuthenticated = (req, res) => {

    let checker = req.profile && req.auth && req.profile._id === req.auth._id;

    if (!checker) {
        return res.status(403).json({
            err: "access denied"
        })
    }
    next();
}

exports.isAdmin = (req, res) => {

    if (req.profile.role === 0) {
        return res.status(403).json({
            err: "you are not Admin,access denied"
        })
    }
    next();

}