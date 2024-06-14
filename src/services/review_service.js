import "../configs/database.js";
import crypto from "crypto";
import { Review } from "../models/review_model.js";
import { Product } from "../models/product_model.js";
import { User } from "../models/user_model.js";

class ReviewService {
  constructor() {}

  async create(data) {
    const reviewId = crypto.randomUUID();
    const res = await Review.create({ ...data, id: reviewId });
    return res;
  }

  async readAll() {
    const res = await Review.findAll({
      attributes: [
        ["review_id", "review_id"],
        "user_id",
        "product_id",
        "rating",
      ],
    });
    return res;
  }

  async readReviewByProductId(productId) {
    const res = await Review.findAll({
      where: { product_id: productId },
      include: [
        {
          model: Product,
          attributes: ["product_name", "image"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    return res;
  }

  async delete(id) {
    const model = await Review.findByPk(id);
    if (!model) {
      throw new Error("Review not found");
    }
    await model.destroy();
    return { deleted: true };
  }
}

export { ReviewService };
