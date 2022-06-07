import db from '../../db.js';
import { SignInSchema, UserSchema } from '../../utils/schemas.js';
import bcrypt from 'bcrypt';

export const validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (result.rows.length === 0) return res.status(409).send({ error: "Email not registered" });
        const user = result.rows[0];
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send({ error: "Wrong Password" });
        res.locals.user = user;
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const validateEmailAvailable = async (req, res, next) => {
    const { email } = req.body;
    try {
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        const result = await db.query(query);
        if (result.rows.length > 0) return res.status(409).send({ error: "Email already registered" });
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const validateSignInBody = (req, res, next) => {
    const { error } = SignInSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    next();
};

export const validateUserBody = (req, res, next) => {
    const { error } = UserSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });
    next();
};
