import * as path from "node:path";

import express from "express";
import {Request, Response} from "express";
import * as fs from "fs";

import {UserValidators} from "./validators/user.validators";

const app = express();

const PORT = 5200;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


interface IUserFullFieldS {
    id: number
    name: string
    email: string
    password: string
}

const usersJSON = path.join(__dirname, "./users.json");
const users: IUserFullFieldS[] = JSON.parse(fs.readFileSync(usersJSON, "utf8"));

export interface IUser {
    name: string
    email: string
    password: string
}

app.get("/users", (req: Request, res: Response) => {
    try {
        res.json(users)
    } catch (error) {
        console.log(error)
    }

})

app.post("/users", (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body as IUser;
        const {error} = UserValidators.createUser.validate(req.body);
        if (error) {
            res.status(404).json({message: "invalid fields"})
        }
        const id = users[users.length - 1].id + 1;
        const newUser = {id, name, email, password};

        users.push(newUser);

        fs.writeFileSync(usersJSON, JSON.stringify(users), "utf8")

        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({message: error})
    }


})

app.get("/users/:userId", (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) return res.status(404).json({message: "user not found"})
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error})
    }

})


app.put("/users/:userId", (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body as IUser;
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) return res.status(404).json({message: "user not found"})
        const {error} = UserValidators.createUser.validate(req.body);
        if (error) {
            res.status(404).json({message: "invalid fields"})
        }
        users[userIndex].email = email
        users[userIndex].password = password
        users[userIndex].name = name

        fs.writeFileSync(usersJSON, JSON.stringify(users), "utf8")
        res.status(200).json({
            message: "user updated successfully"
        });

    } catch (error) {
        res.status(500).json({message: error})
    }

})

app.delete("/users/:userId", (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const userIndex = users.findIndex(user => user.id !== userId);
        if (userIndex === -1) return res.status(404).json({message: "user not found"})
        users.splice(userIndex, 1);
        fs.writeFileSync(usersJSON, JSON.stringify(users), "utf8")
        res.status(200).json({message: "user deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error})

    }

})
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});