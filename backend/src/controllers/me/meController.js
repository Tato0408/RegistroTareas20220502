// meController verifica que la cookie "authCookie" exista y sea válida.
// Si lo es, extrae el id del usuario y lo pasa al siguiente controlador.
// Si no, bloquea la petición con un error 401.
import teacherModel from "../../models/teachers.js";

const meController = {};

meController.getMe = async (req, res) => {
    try {
        // req.user viene del middleware con { id, userType }
        const user = await teacherModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default meController;