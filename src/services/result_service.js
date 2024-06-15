import "../configs/database.js";
import crypto from "crypto";
import { Result } from "../models/result_model.js";
import { Op } from "sequelize";
import { Product } from "../models/product_model.js";

class ResultService {
  constructor() {}

  async create(data) {
    const resultId = crypto.randomUUID();
    const currentDate = new Date().toISOString().split('T')[0]; 
    const res = await Result.create({ ...data, id: resultId, createdAt: currentDate });
    return res;
  }

  async readModel1(userId, createdAt) {
    const product = await Result.findOne({
      attributes: ["recommendation"],
      where: {
        [Op.and]: [
          { user_id: userId },
          { createdAt: createdAt },
          { model_type: "model1" },
        ],
      },
    });
    const recommendationArray = product.recommendation.split(", ");
    const res = await Product.findAll({
      where: { id: { [Op.in]: recommendationArray } },
    });
    return res;
  }

  async readModel2(userId, createdAt) {
    const product = await Result.findOne({
      attributes: ["recommendation"],
      where: {
        [Op.and]: [
          { user_id: userId },
          { createdAt: createdAt },
          { model_type: "model2" },
        ],
      },
    });
    const recommendationArray = product.recommendation.split(", ");
    const res = await Product.findAll({
      where: { id: { [Op.in]: recommendationArray } },
    });
    return res;
  }
}

export { ResultService };