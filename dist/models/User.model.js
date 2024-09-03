"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Sex = void 0;
const mongoose_1 = require("mongoose");
var Sex;
(function (Sex) {
    Sex["Male"] = "Male";
    Sex["Female"] = "Female";
})(Sex || (exports.Sex = Sex = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    sex: {
        type: String,
        enum: Sex
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.User = (0, mongoose_1.model)("User", userSchema);
