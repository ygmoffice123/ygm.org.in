import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addFounder, deleteFounder, editFounder ,fetchAllFounder} from '../controllers/founder.controller.js';

const router = Router();

// Admin-protected founder routes

router.route("/fetch-founder").get(fetchAllFounder);
router.route("/add-founder").post(authMiddleware, addFounder);
router.route("/edit-founder/:id").put(authMiddleware, editFounder);
router.route("/delete-founder/:id").delete(authMiddleware, deleteFounder);      

export default router;
