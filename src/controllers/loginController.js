import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
    const user = res.locals.user;
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {expiresIn:"3d"});
    res.status(200).json({token});
};