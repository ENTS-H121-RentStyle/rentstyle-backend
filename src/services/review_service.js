import "../configs/database.js";
import crypto from "crypto";
import { Review } from "../models/review_model.js";
import { Product } from "../models/product_model.js";

class ReviewService {
    constructor() {}
    
    async create(data) {
        const reviewId = crypto.randomUUID();
        const res = await Review.create({ ...data, id: reviewId });
        return res;
    }
    
    async readReviewByProductId(productId) {
        const res = await Review.findAll({
            where: { product_id: productId },
            include: [
              {
                model: Product,
                attributes: ["product_name", 'image'],
              },
            ],
          });
          return res;
    }

    async delete(id) {
        const model = await Review.findByPk(id);
        await model.destroy();
        return { deleted: true };
    }
}

export { ReviewService };