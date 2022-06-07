import db from '../../db.js';

export const validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // const user = await User.findOne({ email });

        // if (!user) return res.status(409).send({ error: "Email not registered" });
        // if (!bcrypt.compareSync(password, user.password))
        //     return res.status(401).send({ error: "Wrong Password" });

        // res.locals.userInfo = {
        //     userId: user._id,
        //     name: user.name,
        //     email: user.email,
        // };

        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const validateEmailAvailable = async (req, res, next) => {
    const { email } = req.body;
    try {
        // const existingUser = await User.findOne({ email });
        // if (existingUser) return res.status(401).send({ error: "Email already registered" });

        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const validateSignInBody = (req, res, next) => {
    // const { error } = SignInSchema.validate(req.body);
    // if (error) return res.status(422).send({ error: error.details[0].message });
    next();
};

export const validateUserBody = (req, res, next) => {
    // const { error } = userSchema.validate(req.body);
    // if (error) return res.status(422).send({ error: error.details[0].message });
    next();
};
