const User = require("../models/userModel")
const { check, validationResult } = require("express-validator")

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
exports.signout = (req, res) => {
    res.json({
        massage: "User signout"
    })
}