import {Router } from 'express'
import { addStrength, deleteStrength, fetchStrengths } from '../controllers/strength.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = Router()

router.route("/fetch-strength").get(fetchStrengths)
router.route("/add-strength").post(authMiddleware,addStrength)
router.route("/delete-strength/:id").delete(authMiddleware,deleteStrength)


export default router
