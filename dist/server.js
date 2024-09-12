"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./router/user.router");
const app = (0, express_1.default)();
const PORT = 5200;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_router_1.userRouter);
app.use("*", (err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
    next();
});
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
