import { Router } from "express";
import { validateCredentials, validateEmailAvailable, validateSignInBody, validateUserBody } from "./middlewares.js";
import { createSession, createUser } from "./controllers.js";

const router = Router();

router.post('/signup', validateSignInBody, validateCredentials, createSession);
router.post('/signin', validateUserBody, validateEmailAvailable, createUser, createSession);

export default router;