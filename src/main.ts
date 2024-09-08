import express, {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";

import {ApiError} from "./errors/api.error";
import {authRouter} from "./router/auth.router";
import {userRouter} from "./router/user.router";

const PORT = 5100;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err?.status || 500
    next(err)
    return res.status(status).json({
        message: err.message,
        status,
    })

}))

app.listen(PORT, () => {
    mongoose.connect("mongodb://127.0.0.1:27017/ASDB");
    console.log(`Server started on port: ${PORT}`)
})

