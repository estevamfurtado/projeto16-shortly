import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.js';
import { SignInSchema, UserSchema, UrlSchema } from './schemas.js';

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

export async function validateSchema(req, res, next) {
    let schema = null;
    const path = req.originalUrl;
    if (path.includes("/signin")) {
        schema = SignInSchema;
    } else if (path.includes("/signup")) {
        schema = UserSchema;
    } else if (path.includes("/urls/shorten")) {
        schema = UrlSchema;
    }

    const { error } = schema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    next();
}