import {Router } from 'express'
import { registerAdmin,adminLogOut,editAdmin ,getAdmin ,loginAdmin, changePassword} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = Router()

router.route("/register-admin").post(registerAdmin)
router.route("/login-admin").post(loginAdmin)
router.route("/logout-admin").post(authMiddleware,adminLogOut)
router.route("/get-admin").get(authMiddleware,getAdmin)
router.route("/edit-admin").put(authMiddleware,editAdmin)
router.route("/edit-password-admin").put(authMiddleware,changePassword)



export default router
