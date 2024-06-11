import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/review_controller.js";
import validateAddReview from "../middleware/validate_add_review.js";
import { uploadMiddleware } from "../services/image_service.js";

const router = Router();

router
    .post("/", uploadMiddleware, validateAddReview, Controller.addReview)
    .get("/:id", Controller.getReviewByProductId)
    .delete("/:id", tokenAuth, Controller.dropReview);

export default router;