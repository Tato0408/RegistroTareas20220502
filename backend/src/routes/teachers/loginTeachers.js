import express from 'express'
import loginTeachersController from '../../controllers/teachers/loginTeachersController.js'
const router = express.Router()

router.route("/")
.post(loginTeachersController.login)
export default router