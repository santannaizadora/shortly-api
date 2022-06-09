import connection from "../db.js";

export const  ranking = async (req, res) => {
    const query = `
        SELECT users.id, users.name, COALESCE(SUM(urls.visit_count), 0) AS "visitCount", COUNT(urls.url) AS "linksCount"
        FROM urls
        RIGHT JOIN users ON urls.user_id=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
    `
    const result = await connection.query(query);
    res.json(result.rows);
};
