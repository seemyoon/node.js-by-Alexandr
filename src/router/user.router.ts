import {Router} from "express";
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList)
router.post("/", commonMiddleware.isBodyValid(UserValidator.createUser), userController.create)

router.get("/:userId", commonMiddleware.isValid("userId"), userController.getUserById)
router.put("/:userId", commonMiddleware.isBodyValid(UserValidator.updateUser), commonMiddleware.isValid("userId"), userController.updateUserById) //todo

router.delete("/:userId", commonMiddleware.isValid("userId"), userController.deleteUserById)

export const userRouter = router