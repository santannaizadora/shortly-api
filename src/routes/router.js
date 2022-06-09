import { Router } from "express";
import signUpRouter from "./registerRouter.js";
import loginRouter from "./loginRouter.js";

const router = Router();

router.use(signUpRouter);
router.use(loginRouter);

export default router;