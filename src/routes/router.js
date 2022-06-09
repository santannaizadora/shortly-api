import { Router } from "express";
import signUpRouter from "./registerRouter.js";
import loginRouter from "./loginRouter.js";
import urlRouter from "./urlsRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(signUpRouter);
router.use(loginRouter);
router.use("/urls", urlRouter);
router.use(userRouter);

export default router;