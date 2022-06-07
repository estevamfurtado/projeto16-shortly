import db from '../../db.js';

export async function getUserById(req, res) {
    const { id, name } = res.locals.user;
    try {
        let query = `
            SELECT 
            id, "shortUrl", "baseUrl" as url, visits as "visitCount"
            FROM urls 
            WHERE "userId" = ${id} AND "isActive" = true;
        `;
        let result = await db.query(query);
        let shortenedUrls = [...result.rows];

        query = `
            SELECT COALESCE(SUM(visits),0) as "visitCount" 
            FROM urls 
            WHERE "userId" = ${id} AND "isActive" = true;
        `;
        console.log(query);
        result = await db.query(query);
        let visitCount = result.rows[0].visitCount;

        let ans = { id, name, shortenedUrls, visitCount };
        res.status(201).send(ans);
    } catch (e) {
        res.status(500).send({ error: e })
    }
}


export async function getRanking(req, res) {
    console.log('get ranking')
    try {
        let query = `
            SELECT
            us.id, 
            us.name, 
            COUNT(ur.id) AS "linksCount",
            COALESCE(SUM(ur.visits),0) AS "visitCount"
            FROM users us
            LEFT JOIN urls ur ON ur."userId" = us.id
            GROUP BY us.id
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `;
        let result = await db.query(query);
        res.status(201).send(result.rows);
    } catch (e) {
        console.log('aqui');
        res.status(500).send({ error: e })
    }
}
