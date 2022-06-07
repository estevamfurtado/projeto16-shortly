import db from '../../db.js';

export async function createSession(req, res) {
    try {
        // const query = ``;
        // const result = await db.query(query);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send('')
    }
}

export async function createUser(req, res) {
    try {
        // const query = ``;
        // const result = await db.query(query);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send('')
    }
}
