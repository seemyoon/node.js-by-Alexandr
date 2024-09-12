import express, {NextFunction} from "express";
import {userRouter} from "./router/user.router";
import {ApiError} from "./errors/customApiError";

const app = express();
const PORT = 5200;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter)


app.use("*", (err: ApiError, req: express.Request, res: express.Response, next: NextFunction) => {
    res.status(err.status || 500).json({message: err.message});
    next()
})

process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))