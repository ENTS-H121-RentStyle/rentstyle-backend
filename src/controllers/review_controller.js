import { ReviewService } from "../services/review_service.js";
import { validationResult } from "express-validator";
import { Review } from "../models/review_model.js";
import { uploadFileToGCS, deleteFileFromGCS } from "../services/image_service.js";

const service = new ReviewService();

const addReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { order_id, product_id } = req.body;
        const existingReview = await service.findReviewByOrderIdAndProductId(order_id, product_id);
        if (existingReview) {
            return res.status(400).json({ message: "User sudah melakukan review pada order ini" });
        }

        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadFileToGCS(req.file, "review");
        }
    
        const reviewData = {
            ...req.body,
            image: imageUrl,
        };
    
        const response = await service.create(reviewData);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getReviewByProductId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.readReviewByProductId(id);
    
        const sanitizedResponse = response.map((item) => {
            const { product_id, user_id, ...rest } = item.toJSON();
            return rest;
        });
        res.status(200).json(sanitizedResponse);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const dropReview = async(req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: "Review tidak ditemukan!" });
        }

        if (review.image) {
            await deleteFileFromGCS(review.image);
        }

        const response = await service.delete(id);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export default {
    addReview,
    getReviewByProductId,
    dropReview
}
