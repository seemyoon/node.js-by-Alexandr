"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Sex = void 0;
const mongoose_1 = require("mongoose");
var Sex;
(function (Sex) {
    Sex[Sex["Male"] = 0] = "Male";
    Sex[Sex["Female"] = 1] = "Female";
})(Sex || (exports.Sex = Sex = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        min: 0,
        max: 199
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    sex: {
        type: String,
        enum: Sex
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)("user", userSchema);
