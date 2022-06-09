import connection from "../db.js";
import CryptoJS from "crypto-js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    const query = {
        text: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        values: [name, email, hashedPassword]
    };
    const result = await connection.query(query);
    res.status(201).json(result.rows[0]);
}
