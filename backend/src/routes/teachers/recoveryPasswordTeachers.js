import express from 'express'
import recoveryPasswordTecherController from '../../controllers/teachers/recoveryPasswordTeacherController.js'
const router = express.Router()

router.route("/requestCode")
.post( recoveryPasswordTecherController.requestCode)
router.route("/verifyCode")
.post(recoveryPasswordTecherController.verifyCode)
router.route("/newPassword")
.post( recoveryPasswordTecherController.newPassword)
export default router