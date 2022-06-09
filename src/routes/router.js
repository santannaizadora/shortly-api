import { Router } from "express";
import signUpRouter from "./registerRouter.js";

const router = Router();

router.use(signUpRouter);

export default router;