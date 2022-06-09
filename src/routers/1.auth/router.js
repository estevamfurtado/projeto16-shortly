import { Router } from "express";
import { validateCredentials, validateEmailAvailable } from "./middlewares.js";
import { createSession, createUser } from "./controllers.js";
import { validateSchema } from "../../utils/middlewares.js";

const router = Router();

router.post('/signin', validateSchema, validateCredentials, createSession);
router.post('/signup', validateSchema, validateEmailAvailable, createUser);

export default router;