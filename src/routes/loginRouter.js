import { Router } from "express";
import { validateLogin } from "../middlewares/dataValidationMiddleware.js";
import { checkIfUserExists, checkIfpasswordIsCorrect } from "../middlewares/loginMiddleware.js";
import { signin} from "../controllers/loginController.js";

const router = Router();
router.post("/signin", validateLogin, checkIfUserExists, checkIfpasswordIsCorrect, signin);

export default router;