import express from 'express'
import registerTeachersController from '../../controllers/teachers/registerTeachersController.js'
const router = express.Router()

router.route("/")
.post(registerTeachersController.insertTeacher)
router.route("/verifyCodeInsert")
.post( registerTeachersController.verifyCodeInsert)
export default router