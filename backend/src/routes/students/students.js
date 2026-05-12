import express from 'express'
import studentsController from '../../controllers/students/studentsController.js'
const router = express.Router()

router.route("/")
.get(studentsController.getStudents)

router.route("/:id")
.put(studentsController.updateStudents)
.delete(studentsController.deleteStudent)

export default router