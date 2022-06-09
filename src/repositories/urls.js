import { nanoid } from "nanoid";
import sanitizeHtml from "sanitize-html";
import db from "../db.js";

async function createShortUrl(url, userId) {
    const shortUrl = nanoid(8);
    const query = `INSERT INTO urls ("baseUrl", "shortUrl", "userId") VALUES ('${sanitizeHtml(url)}', '${shortUrl}', ${userId});`;
    const response = await db.query(query);
    return shortUrl;
}

async function getActiveUrl(id) {
    const query = `SELECT * FROM urls WHERE id = ${id} AND "isActive" = true;`;
    const result = await db.query(query);
    return result.rows[0];
}

async function getActiveUrlByShortUrl(shortUrl) {
    const query = `SELECT * FROM urls WHERE "shortUrl" = '${shortUrl}' AND "isActive" = true;`;
    const result = await db.query(query);
    return result.rows[0];
}

async function deleteUrl(id) {
    const query = `UPDATE urls SET "isActive" = false WHERE id = ${id};`;
    const result = await db.query(query);
    return result;
}

async function incrementVisit(id) {
    const query = `UPDATE urls SET visits = visits+1 WHERE id = ${id};`;
    const result = await db.query(query);
    return result;
}

export const urlRepository = {
    createShortUrl,
    getActiveUrl,
    getActiveUrlByShortUrl,
    incrementVisit,
    deleteUrl
}