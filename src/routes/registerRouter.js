import { Router } from "express";
import { signup } from "../controllers/registerController.js";
import { validateRegister } from "../middlewares/dataValidationMiddleware.js";
import { checkIfEmailIsTaken } from "../middlewares/registerMiddleware.js";

const router = Router();

router.post("/signup", validateRegister, checkIfEmailIsTaken, signup);

export default router;