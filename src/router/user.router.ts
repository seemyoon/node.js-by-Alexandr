import {Router} from "express";
import {userController} from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList)
router.post("/", userController.create)

router.get("/:userId", userController.getUserById)
router.put("/:userId", userController.updateUserById)

router.delete("/:userId", userController.deleteUserById)

export const userRouter = router