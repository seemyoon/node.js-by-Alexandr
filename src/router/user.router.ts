import {Router} from "express";
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.get("/", userController.getList)

router.get("/me", authMiddleware.checkAccessToken, userController.getMe)
router.put("/me", authMiddleware.checkAccessToken, commonMiddleware.isBodyValid(UserValidator.update), userController.updateMe)
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe)

router.get("/:userId", commonMiddleware.isValid("userId"), userController.getById)
export const userRouter = router