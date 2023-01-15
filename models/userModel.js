const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true

    },
    lastname:
    {
        type: String,
        trim: true,
        maxlength: 32,
        required: true

    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(this.password);
    return next();
});

module.exports = mongoose.model("User", userSchema);