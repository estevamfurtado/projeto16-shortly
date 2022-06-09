import { userRepository } from '../../repositories/user.js';

export async function validateUserId(req, res, next) {
    const { userId } = req.params;
    try {
        const user = await userRepository.getUser(userId);
        console.log(user);
        if (!user) return res.status(404).send({ error: "User not found" });
        res.locals.user = user;
        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
}
