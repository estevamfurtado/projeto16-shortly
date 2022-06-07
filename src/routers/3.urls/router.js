import { Router } from "express";
import { validateShortUrl, validateUrl } from "./middlewares.js";
import { createShortUrl, deleteUrl, findUrlById, redirectToUrl } from "./controllers.js";
import { helloWorld } from "../../utils/controllers.js";
import { validateToken } from "../../utils/middlewares.js";

const router = Router();

router.post('/shorten', validateToken, validateUrl, createShortUrl);
router.get('/:id', findUrlById);
router.get('/open/:shortUrl', validateShortUrl, redirectToUrl);
router.delete('/:id', validateToken, deleteUrl);

export default router;
