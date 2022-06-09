import connection from "../db.js";
export const getUserById = async (req, res) => {
    const { id } = req.params;
    const query = {
        text: `SELECT users.id, users.name, soma.sum as "visitCount", urls.id as "urlId", 
                urls.short_url as "shortUrl", urls.url, urls.visit_count as "urlVisitCount"
                FROM urls urls
                JOIN users ON users.id = urls.user_id,
                (SELECT SUM(u.visit_count) as sum, u.user_id as user_id FROM urls u GROUP BY u.user_id) soma
                WHERE users.id = $1 AND users.id = urls.user_id AND users.id = soma.user_id`,
        values: [id]
    };
    try{
        const result = await connection.query(query);
        if(result.rows.length === 0) return res.status(404).json({ message: "User not found" });
        const response = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            visitCount: result.rows[0].visitCount,
            shortenedUrls: result.rows.map(url => ({
                id: url.urlId,
                shortUrl: url.shortUrl,
                url: url.url,
                visitCount: url.urlVisitCount
            }))
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};
