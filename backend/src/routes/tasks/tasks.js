import express from 'express'
import taskController from '../../controllers/tasks/taskController.js'
const router = express.Router()

router.route("/")
.get(taskController.getTask)
.post(taskController.insertTask)

router.route("/:id")
.put(taskController.updateTask)
.delete(taskController.deleteTask)

export default router