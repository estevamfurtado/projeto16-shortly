import jwt from 'jsonwebtoken';
import { userRepository } from '../../repositories/user.js';


export async function createSession(req, res) {
    const userId = res.locals.user.id;
    try {
        const session = await userRepository.createSession(userId);
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ sessionId: session.id }, secretKey);
        res.status(201).send(token);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}

export async function createUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const newUser = await userRepository.createUser(name, email, password);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}
