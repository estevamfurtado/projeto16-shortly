import { Router } from "express";
import { validateUserId } from "./middlewares.js";
import { getUserById } from "./controllers.js";
import { validateToken } from "../../utils/middlewares.js";

const router = Router();

router.get('/:userId', validateToken, validateUserId, getUserById);

export default router;

