import { Router } from "express";
import { validateCredentials, validateEmailAvailable, validateSignInBody, validateUserBody } from "./middlewares.js";
import { createSession, createUser } from "./controllers.js";

const router = Router();

router.post('/signin', validateSignInBody, validateCredentials, createSession);
router.post('/signup', validateUserBody, validateEmailAvailable, createUser);

export default router;