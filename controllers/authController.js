const User = require("../models/userModel")
exports.signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const data = await User.create({
        firstname, lastname, email, password
    })
    data.password = undefined
    res.send(data);

}
exports.signout = (req, res) => {
    res.json({
        massage: "User signout"
    })
}