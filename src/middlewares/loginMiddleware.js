import connection from "../db.js";
import CryptoJS from "crypto-js";

export const checkIfUserExists = async (req, res, next) => {
    const { email } = req.body;
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await connection.query(query, [email]);
    if (result.rows.length === 0) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    next();
}

export const checkIfpasswordIsCorrect = async (req, res, next) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await connection.query(query, [email]);
    const user = result.rows[0];
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
        return res.status(401).json({
            message: "Incorrect password",
        });
    }
    res.locals.user = user;
    next();
}