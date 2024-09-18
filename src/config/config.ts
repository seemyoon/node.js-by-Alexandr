import dotenv from "dotenv";
dotenv.config()

export const configs = {
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    APP_MONGO_URL: process.env.MONGO_URL,
}