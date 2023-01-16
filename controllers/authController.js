const User = require("../models/userModel")
// exports.signup = async (req, res) => {
//     const { firstname, lastname, email, password } = req.body;

//     const data = await User.create({
//         firstname, lastname, email, password
//     })
//     data.password = undefined
//     res.send(data);

// }
exports.signup = async (req, res) => {
    const user = new User(req.body)
    await user.save((err, user) => {
        console.log(err)
        console.log(user)
        if (err) {
            return res.status(400).json({
                err: "not able to save user"
            })
        }
        res.status(200).json(user)
    })


}
exports.signout = (req, res) => {
    res.json({
        massage: "User signout"
    })
}