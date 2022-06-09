import { SignInSchema, UserSchema } from '../../utils/schemas.js';
import bcrypt from 'bcrypt';
import { userRepository } from '../../repositories/user.js';

export const validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log('> validating credentials');
        const user = await userRepository.getUserByEmail(email);
        console.log('> user found: ', user);
        if (!user) return res.status(409).send({ error: "Email not registered" });
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send({ error: "Wrong Password" });
        console.log('> right password');
        res.locals.user = user;
        next();
    } catch (err) {
        console.log('> error validating credentials');
        res.status(500).send({ error: err });
    }
};

export const validateEmailAvailable = async (req, res, next) => {
    const { email } = req.body;
    try {
        console.log('> checking email availability');
        const user = await userRepository.getUserByEmail(email);
        console.log('> user:', user);
        if (user) return res.status(409).send({ error: "Email already registered" });
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};