import jwt from 'jsonwebtoken';
import db from '../db.js';

export async function validateToken(req, res, next) {

    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const { sessionId, error } = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            return err ? { error: "Invalid token" } : decoded;
        }
    );
    if (error) return res.status(401).send(error);

    try {
        const result = await db.query('SELECT * FROM sessions WHERE id = $1', [sessionId]);
        if (result.rows.length === 0) return res.status(401).send("Invalid token");

        const session = result.rows[0];
        if (!session.isValid) return res.status(401).send("Token is now invalid");
        res.locals = { userId: session.userId };
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
