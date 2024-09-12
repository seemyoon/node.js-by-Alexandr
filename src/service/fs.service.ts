import {IUser} from "../interfaces/user.interface";
import path from "node:path";
import * as fs from "node:fs/promises";

const read = async (): Promise<IUser[]> => {
    try {
        const pathToFile = path.join(process.cwd(), "db.json")
        const resultRead = await fs.readFile(pathToFile, "utf8")
        return resultRead ? JSON.parse(resultRead) : [];
    } catch (error) {
        console.log(error.message)
    }

}

const write = async (data: IUser[]): Promise<void> => {
    try {
        const pathToFile = path.join(process.cwd(), "db.json")
        await fs.writeFile(pathToFile, JSON.stringify(data))

    } catch (error) {
        console.log(error.message)
    }

}

export {read, write}