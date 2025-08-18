import { Router } from "express";
import { addFeedback, getFeedbacks, updateFeedback, deleteFeedback } from "../controllers/feedback.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // if authentication is required

const router = Router();

router.route("/fetch-feedbacks/:currentPage/:limit").get(getFeedbacks);
// router.route("/fetch-feedbacks").get(getFeedbacks);

router.route("/add-feedback").post(authMiddleware, addFeedback);

router.route("/edit-feedback/:id").put(authMiddleware, updateFeedback);

router.route("/delete-feedback/:id").delete(authMiddleware, deleteFeedback);

export default router;
