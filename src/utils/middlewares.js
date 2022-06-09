import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.js';

export async function validateToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send({ error: "Missing authorization header" });
    }

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
        const session = await userRepository.getSession(sessionId);
        if (!session.isValid) return res.status(401).send("Token is now invalid");
        res.locals = { userId: session.userId };
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
