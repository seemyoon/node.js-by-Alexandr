import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.post("/sign-in", authController.signIn)
router.post("/sign-up", commonMiddleware.isBodyValid(UserValidator.createUser), authController.signUp);

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refreshToken)

export const authRouter = router