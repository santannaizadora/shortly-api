import { nanoid } from "nanoid";
import connection from "../db.js";

export const shortenUrl = async (req, res) => {
    const { url } = req.body;
    const user = res.locals.user;
    const shortUrl = nanoid(8);
    const query = {
        text: "INSERT INTO urls (url, short_url, user_id) VALUES ($1, $2, $3)",
        values: [url, shortUrl, user.id]
    };
    try{
        const result = await connection.query(query);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
    
export const getUrlById = async (req, res) => {
    const { id } = req.params;
    const query = {
        text: "SELECT id, short_url, url FROM urls WHERE id = $1",
        values: [id]
    };
    try{
        const result = await connection.query(query);
        if(result.rows.length === 0) return res.status(404).json({ message: "Url not found" });
        const response = {
            id: result.rows[0].id,
            shortUrl: result.rows[0].short_url,
            url: result.rows[0].url
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const deleteUrl = async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;
    const query = {
        text: "DELETE FROM urls WHERE id = $1 AND user_id = $2",
        values: [id, user.id]
    };
    try{
        const result = await connection.query(query);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const openUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const query = {
        text: "SELECT url FROM urls WHERE short_url = $1",
        values: [shortUrl]
    };
    try{
        const result = await connection.query(query);
        if(result.rows.length === 0) return res.status(404).json({ message: "Url not found" });
        res.redirect(result.rows[0].url);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};