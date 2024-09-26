import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {ActionTokenTypeEnum} from "../enums/actionTokenType.enum";

const router = Router();

router.post("/sign-in", commonMiddleware.isBodyValid(UserValidator.signIn), authController.signIn)
router.post("/sign-up", commonMiddleware.isBodyValid(UserValidator.createUser), authController.signUp);

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refreshToken)

router.post("/logOutDevice", authMiddleware.checkAccessToken, authController.logOutDevice)
router.post("/logOutManyDevices", authMiddleware.checkAccessToken, authController.logOutManyDevices)

router.post("/forgot-password", authController.forgotPasswordSendEmail)
router.put("/forgot-password", authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD), authController.forgotPasswordChange)

router.put("/verify", authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL), authController.verify)

export const authRouter = router