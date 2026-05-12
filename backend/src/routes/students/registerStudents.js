import express from 'express'
import registerStudentsController from '../../controllers/students/registerStudentsController.js'
const router = express.Router()

router.route("/")
.post(registerStudentsController.insertStudent)
router.route("/verifyCodeInsert")
.post( registerStudentsController.verifyCodeInsert)
export default router