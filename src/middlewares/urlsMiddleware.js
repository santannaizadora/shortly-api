import connection from "../db.js";

export const checkIfUrlBelongsToUser = async (req, res, next) => {
    const user = res.locals.user;
    const { id } = req.params;
    const query = `SELECT * FROM urls WHERE id = $1 AND user_id = $2`;
    const result = await connection.query(query, [id, user.id]);
    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "Url either not found or you are not the owner",
        });
    }
    next();
};