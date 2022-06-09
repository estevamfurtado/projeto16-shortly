import jwt from 'jsonwebtoken';
import { userRepository } from '../../repositories/user.js';


export async function createSession(req, res) {
    console.log('> creating session');
    const userId = res.locals.user.id;
    try {
        const session = await userRepository.createSession(userId);
        console.log('> session created: ', session);
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ sessionId: session.id }, secretKey);
        console.log('> token created: ', token);
        res.status(201).send(token);
    } catch (e) {
        console.log('> error creating session');
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
