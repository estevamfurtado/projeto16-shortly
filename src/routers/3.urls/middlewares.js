import { urlRepository } from '../../repositories/urls.js';
import { UrlSchema } from '../../utils/schemas.js';


export async function validateUrlId(req, res, next) {
    const { urlId } = req.params;

    try {
        const url = await urlRepository.getActiveUrl(urlId);
        if (!url) {
            return res.status(404).send({ error: "Url is inactive" });
        }
        res.locals.url = url;
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

export async function validateOwnership(req, res, next) {
    const { userId, url } = res.locals;
    if (url.userId !== userId) {
        return res.status(401).send({ error: "User is not the owner" });
    }
    next();
}

export async function validateShortUrl(req, res, next) {
    const { shortUrl } = req.params;
    try {
        const url = await urlRepository.getActiveUrlByShortUrl(shortUrl);
        if (!url) return res.status(404).send({ error: "Url not found" });
        res.locals.url = url;
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
}
