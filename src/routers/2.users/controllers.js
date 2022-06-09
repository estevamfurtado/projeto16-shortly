import { userRepository } from '../../repositories/user.js';

export async function getUserById(req, res) {
    const { id, name } = res.locals.user;
    try {
        let shortenedUrls = await userRepository.getShortenedUrls(id);
        let visitCount = await userRepository.getVisitCount(id);

        let ans = { id, name, shortenedUrls, visitCount };
        res.status(201).send(ans);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}


export async function getRanking(req, res) {
    try {
        let ranking = await userRepository.getRanking();
        res.status(201).send(ranking);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}
