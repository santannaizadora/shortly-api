import { Router } from "express";
import { shortenUrl, getUrlById, deleteUrl, openUrl } from "../controllers/urlsController.js";
import { validateUrl } from "../middlewares/dataValidationMiddleware.js";
import { verifyToken } from "../middlewares/verifyTokenMiddleware.js";
import { checkIfUrlBelongsToUser } from "../middlewares/urlsMiddleware.js";

const router = Router();

router.post("/shorten", verifyToken, validateUrl, shortenUrl);
router.get("/:id", getUrlById);
router.delete("/:id", verifyToken, checkIfUrlBelongsToUser, deleteUrl);
router.get("/open/:shortUrl", openUrl);

export default router;