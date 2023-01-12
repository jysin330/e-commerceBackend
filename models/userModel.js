const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
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
    encry_password: {
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
userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this.securePassword(plainpassword) === this.encry_password;
    })

userSchema.method = {
    authenticate: function (plainpassword) {
        return this._password
    },
    securePassword: function (plainpassword) {
        if (!password) return "";
        try {
            return createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);