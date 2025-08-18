import express from 'express';
import {
  getContactInfo,
  updateContactInfo,
  createContactInfo,
} from '../controllers/contactInfo.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/get-contactInfo').get(getContactInfo);
router.route('/create-contactInfo').post( authMiddleware,createContactInfo); 
router.route('/update-contactInfo/:id').put(authMiddleware,updateContactInfo); 

export default router;
