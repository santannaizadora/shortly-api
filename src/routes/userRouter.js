import Router from "express";
import { verifyToken } from "../middlewares/verifyTokenMiddleware.js";
import { checkIfIsTheUser } from "../middlewares/userMiddleware.js";
import { getUserById } from "../controllers/userController.js";

const router = Router();

router.get("/users/:id", verifyToken, checkIfIsTheUser, getUserById);

export default router;