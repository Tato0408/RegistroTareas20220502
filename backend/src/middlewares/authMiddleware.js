//Este middleware verifica que la cookie "authCookie" exista y sea válida.
// Si lo es, extrae el id del usuario y lo pasa al siguiente controlador.
// Si no, bloquea la petición con un error 401.

import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.authCookie;

        if (!token) {
            return res.status(401).json({ message: "No autorizado, token no encontrado" });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        req.user = decoded; // { id, userType }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

export default verifyToken;