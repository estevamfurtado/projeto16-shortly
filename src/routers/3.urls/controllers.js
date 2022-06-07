import db from '../../db.js';
import { nanoid } from 'nanoid';

export async function createShortUrl(req, res) {
    const { url } = req.body;
    const shortUrl = nanoid(8);
    const { userId } = res.locals;
    try {
        const query = `INSERT INTO urls ("baseUrl", "shortUrl", "userId") VALUES ('${url}', '${shortUrl}', '${userId}')`;
        console.log(query);
        const result = await db.query(query);
        res.status(201).send({ shortUrl });
    } catch (e) {
        res.status(500).send({ error: e });
    }
}

// todo
export async function findUrlById(req, res) {
    const { id, baseUrl, shortUrl, isActive } = res.locals.url;
    res.status(201).send({ id, url: baseUrl, shortUrl });
}

export async function redirectToUrl(req, res) {
    const { baseUrl, id } = res.locals.url;
    try {
        const query = `UPDATE urls SET visits = visits+1 WHERE id = ${id}`;
        const result = await db.query(query);
        res.redirect(baseUrl);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}

export async function deleteUrl(req, res) {
    const { id } = res.locals.url;
    try {
        const query = `UPDATE urls SET "isActive" = false WHERE id = ${id};`;
        const result = await db.query(query);
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}