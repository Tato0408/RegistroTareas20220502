import express from 'express'
import topicController from '../../controllers/topics/topicController.js'
const router = express.Router()

router.route("/")
.get(topicController.getTopic)
.post(topicController.insertTopic)

router.route("/:id")
.put(topicController.updateTopic)
.delete(topicController.deleteTopic)

export default router