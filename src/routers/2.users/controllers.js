import db from '../../db.js';

export async function getUserById(req, res) {
    try {
        // const query = ``;
        // const result = await db.query(query);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send('')
    }
}

export async function getRanking(req, res) {
    try {
        // const query = ``;
        // const result = await db.query(query);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send('')
    }
}
