import "../configs/database.js";
import crypto from "crypto";
import { Result } from "../models/result_model.js";
import { Op } from "sequelize";
import { Product } from "../models/product_model.js";
import { Seller } from "../models/seller_model.js";

class ResultService {
  constructor() {}

  async create(data) {
    const resultId = crypto.randomUUID();

    // Buat objek Date untuk waktu saat ini
    const currentDate = new Date();

    // Atur zona waktu ke Waktu Indonesia Barat (WIB)
    currentDate.setHours(currentDate.getHours() + 7); // Indonesia Barat (UTC+7)
    
    // Format tanggal ke format ISO tanpa waktu (hanya tanggal)
    const isoDate = currentDate.toISOString().split("T")[0];

    const res = await Result.create({
      ...data,
      id: resultId,
      createdAt: isoDate,
    });

    return res;
  }

  async readModel(userId, createdAt, modelType) {
    const product = await Result.findOne({
      attributes: ["recommendation"],
      where: {
        [Op.and]: [
          { user_id: userId },
          { createdAt: createdAt },
          { model_type: modelType },
        ],
      },
    });
    const recommendationArray = product.recommendation.split(", ");
    const res = await Product.findAll({
      where: {
        id: { [Op.in]: recommendationArray },
      },
      include: [
        {
          model: Seller,
          attributes: ["id", "city"],
        },
      ],
    });
    return res;
  }
}

export { ResultService };
