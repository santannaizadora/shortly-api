import connection from "../db.js";

export const checkIfIsTheUser = async (req, res, next) => {
    const { id } = req.params;
    const user = res.locals.user;
    if (user.id !== parseInt(id)) {
        return res.status(401).json({
            message: "You are not authorized to access this resource",
        });
    }
    next();
};

export const checkIfUserExists = async (req, res, next) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await connection.query(query, [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    next();
};
