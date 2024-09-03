import {Router} from "express";

import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middleware/user.middleware";

const router = Router()

router.get("/:id", userMiddleware.findByIdOrThrow, userController.findById)

router.get("/", userController.findAll)

router.post("/", userController.create)

router.put("/:id", userController.updateById)

router.delete("/:id", userController.deleteById)

export const userRouter = router;