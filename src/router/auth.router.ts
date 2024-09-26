import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.post("/sign-in", commonMiddleware.isBodyValid(UserValidator.signIn), authController.signIn)
router.post("/sign-up", commonMiddleware.isBodyValid(UserValidator.createUser), authController.signUp);

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refreshToken)

router.post("/logOutDevice", authMiddleware.checkAccessToken, authController.logOutDevice)
router.post("/logOutManyDevices", authMiddleware.checkAccessToken, authController.logOutManyDevices)

router.post("/forgot-password", authController.forgotPasswordSendEmail)
router.put("/forgot-password",authMiddleware.checkActionToken, authController.forgotPasswordChange)

router.put("/verify", authController.verify)

export const authRouter = router