import db from '../db.js';
import sanitizeHtml from 'sanitize-html';
import bcrypt from 'bcrypt';

async function createUser(name, email, password) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const result = await db.query(query, [sanitizeHtml(name), sanitizeHtml(email), sanitizeHtml(encryptedPassword)]);
    return result.rows[0];
}

async function getUser(id) {
    const query = `SELECT * FROM users WHERE id=${id};`;
    const response = await db.query(query);
    return response.rows[0];
}

async function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = '${email}';`;
    const response = await db.query(query);
    return response.rows[0];
}

async function getShortenedUrls(id) {
    const query = `
        SELECT 
            id, "shortUrl", "baseUrl" as url, visits as "visitCount"
        FROM urls 
        WHERE "userId" = $1 AND "isActive" = true;
    `
    const response = await db.query(query, [id]);
    return response.rows;
}

async function getVisitCount(id) {
    const query = `
    SELECT COALESCE(SUM(visits),0) as "visitCount" 
    FROM urls 
    WHERE "userId" = $1 AND "isActive" = true;
    `
    const response = await db.query(query, [id]);
    return response.rows[0].visitCount;
}

async function getRanking() {
    const query = `
        SELECT 
            us.id, us.name, 
            COUNT(ur.id) AS "linksCount",
            COALESCE(SUM(ur.visits),0) AS "visitCount"
        FROM users us
        LEFT JOIN urls ur ON ur."userId" = us.id
        GROUP BY us.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `
    const response = await db.query(query, []);
    return response.rows;
}



async function createSession(userId) {
    const query = `INSERT INTO sessions ("userId") VALUES ($1) RETURNING *`;
    const result = await db.query(query, [sanitizeHtml(userId)]);
    return result.rows[0];
}

async function getSession(tokenId) {
    const query = `SELECT * FROM sessions WHERE id=${tokenId};`;
    const response = await db.query(query);
    return response.rows[0];
}

export const userRepository = {
    createUser,
    getUser,
    getUserByEmail,
    getShortenedUrls,
    getVisitCount,
    getRanking,
    createSession,
    getSession
}