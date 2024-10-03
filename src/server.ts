import express, {Response, Request, NextFunction} from "express";
import {userRouter} from "./router/user.router";
import {ApiError} from "./errors/customApiError";
import {configs} from "./config/config";
import * as mongoose from 'mongoose'
import {authRouter} from "./router/auth.router";
// import {cronRunner} from "./cron";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter)
app.use("/auth", authRouter)

app.use("*", (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({message: err.message});
    next()
})

process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
})

app.listen(configs.APP_PORT, async () => {
    await mongoose.connect(configs.APP_MONGO_URL)
    // cronRunner()
    console.log(`Server running on http://${configs.APP_HOST}:${configs.APP_PORT}`)
})

