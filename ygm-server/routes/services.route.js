import {Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addService, deleteService, fetchServices, updateService } from '../controllers/services.controller.js'
const router = Router()

router.route("/fetch-service").get(fetchServices)
router.route("/add-service").post(authMiddleware,addService)
router.route("/delete-service/:id").delete(authMiddleware,deleteService)
router.route("/edit-service/:id").put(authMiddleware,updateService)


export default router
