const mongoose = require("mongoose");
const { trim } = require("validator");
const validate = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        maxlength: [50, "Name cannot be more than 50 characters"]
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        validate: [validate.isEmail, "Please provide a valid email address"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,

    }
});

UserSchema.pre("save", async function (next) {
    this.password =  bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model("User", UserSchema);

