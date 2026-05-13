// meRoute define el endpoint GET /api/me.
// Primero pasa por verifyToken y luego devuelve los datos del usuario activo.
// El frontend lo usa para saber quién está logueado al cargar la app.
import express from "express";
import meController from "../../controllers/me/meController.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

// verifyToken protege la ruta antes de ejecutar getMe
router.route("/").get(verifyToken, meController.getMe);

export default router;