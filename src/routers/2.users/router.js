import { Router } from "express";
import { validateUserId } from "./middlewares.js";
import { getRanking, getUserById } from "./controllers.js";
import { helloWorld } from "../../utils/controllers.js";

const router = Router();

router.get('/id/:userId', validateUserId, getUserById);
router.get('/ranking', getRanking);
router.get('/hello', helloWorld);

export default router;

