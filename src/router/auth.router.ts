import {Router} from "express";

import {authController} from "../controllers/auth.controller";
import {userMiddleware} from "../middleware/user.middleware";

const router = Router();

router.post("/register",userMiddleware.isValidRegister, authController.register)
router.post("/login", authController.login)

export const authRouter = router 