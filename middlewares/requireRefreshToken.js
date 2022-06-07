import jsonwebtoken from "jsonwebtoken";
import { tokenVericationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) => {
    try{
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) throw new Error('No existe el token');

        const {uid} = jsonwebtoken.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;

        next();

    } catch(error){
        res.status(401).json({ error : tokenVericationErrors[error.message] });
    }
}