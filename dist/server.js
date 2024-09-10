"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("node:path"));
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const user_validators_1 = require("./validators/user.validators");
const app = (0, express_1.default)();
const PORT = 5200;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const usersJSON = path.join(__dirname, "./users.json");
const users = JSON.parse(fs.readFileSync(usersJSON, "utf8"));
app.get("/users", (req, res) => {
    try {
        res.json(users);
    }
    catch (error) {
        console.log(error);
    }
});
app.post("/users", (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { error } = user_validators_1.UserValidators.createUser.validate(req.body);
        if (error) {
            res.status(404).json({ message: "invalid fields" });
        }
        const id = users[users.length - 1].id + 1;
        const newUser = { id, name, email, password };
        users.push(newUser);
        fs.writeFileSync(usersJSON, JSON.stringify(users), "utf8");
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
app.get("/users/:userId", (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user)
            return res.status(404).json({ message: "user not found" });
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
app.put("/users/:userId", (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1)
            return res.status(404).json({ message: "user not found" });
        const { error } = user_validators_1.UserValidators.createUser.validate(req.body);
        if (error) {
            res.status(404).json({ message: "invalid fields" });
        }
        users[userIndex].email = email;
        users[userIndex].password = password;
        users[userIndex].name = name;
        fs.writeFileSync(usersJSON, JSON.stringify(users), "utf8");
        res.status(200).json({
            message: "user updated successfully"
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
app.delete("/users/:userId", (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1)
            return res.status(404).json({ message: "user not found" });
        users.splice(userIndex, 1);
        fs.writeFileSync(usersJSON, JSON.stringify(users), "utf8");
        res.status(200).json({ message: "user deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
