import express from 'express'
import categoriesController from '../../controllers/categories/categoriesController.js'
const router = express.Router()

router.route("/")
.get(categoriesController.getCategories)
.post(categoriesController.insertCategorie)

router.route("/:id")
.put(categoriesController.updateCategorie)
.delete(categoriesController.deleteCategorie)

export default router