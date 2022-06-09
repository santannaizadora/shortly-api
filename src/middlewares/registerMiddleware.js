import connection from "../db.js";

export const checkIfEmailIsTaken = async (req, res, next) => {
    const { email } = req.body;
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await connection.query(query, [email]);
    if (result.rows.length > 0) {
        return res.status(409).json({
            message: "Email already taken",
        });
    }
    next();
}