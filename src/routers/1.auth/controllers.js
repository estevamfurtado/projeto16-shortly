import db from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';


export async function createSession(req, res) {
    console.log('creating session');
    const userId = res.locals.user.id;
    try {
        const query = `INSERT INTO sessions ("userId") VALUES ($1) RETURNING *`;
        const result = await db.query(query, [sanitizeHtml(userId)]);
        const session = result.rows[0];
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ sessionId: session.id }, secretKey);
        res.status(201).send(token);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}



export async function createUser(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {
        const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(query, [sanitizeHtml(name), sanitizeHtml(email), sanitizeHtml(encryptedPassword)]);
        res.locals.user = result.rows[0];
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}
