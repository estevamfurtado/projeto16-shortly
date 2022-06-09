import { Router } from "express";
import { validateOwnership, validateShortUrl, validateUrlId } from "./middlewares.js";
import { createShortUrl, deleteUrl, findUrlById, redirectToUrl } from "./controllers.js";
import { validateSchema, validateToken } from "../../utils/middlewares.js";

const router = Router();

router.post('/shorten', validateToken, validateSchema, createShortUrl); //ok
router.get('/:urlId', validateUrlId, findUrlById); // ok
router.get('/open/:shortUrl', validateShortUrl, redirectToUrl); // ok
router.delete('/:urlId', validateToken, validateUrlId, validateOwnership, deleteUrl); // ok

export default router;
