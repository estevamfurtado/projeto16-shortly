import { Router } from "express";
import { validateUserId } from "./middlewares.js";
import { getRanking, getUserById } from "./controllers.js";

const router = Router();

router.get('/:id', validateUserId, getUserById);
router.get('/ranking', getRanking);

export default router;

