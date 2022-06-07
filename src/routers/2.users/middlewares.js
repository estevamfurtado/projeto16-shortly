import db from '../../db.js';

export async function validateUserId(req, res, next) {
    const { userId } = req.params;
    try {
        const query = `
            SELECT *  
            FROM users
            WHERE id = ${userId};
        `;
        const result = await db.query(query);
        if (result.rows.length === 0) return res.status(404).send({ error: "User not found" });
        res.locals.user = result.rows[0];
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
}
