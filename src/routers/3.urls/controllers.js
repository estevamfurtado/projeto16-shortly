import { urlRepository } from '../../repositories/urls.js';

export async function createShortUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    try {
        const shortUrl = await urlRepository.createShortUrl(url, userId);
        res.status(201).send({ shortUrl });
    } catch (e) {
        res.status(500).send({ error: e });
    }
}

export async function findUrlById(req, res) {
    const { id, baseUrl, shortUrl, isActive } = res.locals.url;
    res.status(201).send({ id, url: baseUrl, shortUrl });
}

export async function redirectToUrl(req, res) {
    const { baseUrl, id } = res.locals.url;
    try {
        await urlRepository.incrementVisit(id);
        res.redirect(baseUrl);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}

export async function deleteUrl(req, res) {
    const { id } = res.locals.url;
    try {
        await urlRepository.deleteUrl(id);
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}