import express from 'express'
import loginStudentsController from '../../controllers/students/loginStudentsController.js'
const router = express.Router()

router.route("/")
.post(loginStudentsController.login)
export default router

