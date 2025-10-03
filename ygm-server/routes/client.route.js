import {Router } from 'express'
import {
//   addClient,
//   deleteClient,
//   fetchClients,
//   fetchClientsByService,
//   editClient,
//   editClientOrder,
  fetchAllClients,
  fetchAllClientsByService,
  uploadClients,
  deleteClientData,
  updateClient,
  updateClientOrder,
  getAllClient,
} from "../controllers/client.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router = Router()

// router.route("/fetch-client/:currentPage/:limit").get(fetchClients)
// router.route("/fetch-client-by-service/:serviceID").get(fetchClientsByService)
// router.route("/add-client").post(authMiddleware,addClient)
// router.route("/delete-client/:id").delete(authMiddleware,deleteClient)
// router.route("/edit-client/:id").put(authMiddleware,editClient)
// router.route("/edit-client-order/:id").put(authMiddleware,editClientOrder)
// router.route("/get-all-client").get(getAllClient)

router.route("/fetch-client/:currentPage/:limit").get(fetchAllClients)
router.route("/fetch-client-by-service/:serviceID").get(fetchAllClientsByService)
router.route("/add-client").post(authMiddleware,uploadClients)
router.route("/delete-client/:id").delete(authMiddleware,deleteClientData)
router.route("/edit-client/:id").put(authMiddleware,updateClient)
router.route("/edit-client-order/:id").put(authMiddleware,updateClientOrder)
router.route("/get-all-client").get(getAllClient)


export default router
