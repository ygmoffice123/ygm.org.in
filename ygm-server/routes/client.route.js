import {Router } from 'express'
import { addClient, deleteClient, fetchClients, fetchClientsByService ,getAllClient,editClient, editClientOrder} from '../controllers/client.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = Router()

router.route("/fetch-client/:currentPage/:limit").get(fetchClients)
router.route("/fetch-client-by-service/:serviceID").get(fetchClientsByService)
router.route("/add-client").post(authMiddleware,addClient)
router.route("/delete-client/:id").delete(authMiddleware,deleteClient)
router.route("/edit-client/:id").put(authMiddleware,editClient)
router.route("/edit-client-order/:id").put(authMiddleware,editClientOrder)
router.route("/get-all-client").get(getAllClient)


export default router
