import "../configs/database.js";
import crypto from "crypto";
import { Result } from "../models/result_model.js";
import { Op } from "sequelize";
import { Product } from "../models/product_model.js";

class ResultService {
  constructor() {}

  async create(data, model) {
    const resultId = crypto.randomUUID();
    const recommendationString = data.recommendation.join(", ");
    const res = await Result.create({
      ...data,
      id: resultId,
      modelType: model,
      recommendation: recommendationString,
    });
    return res;
  }

  async readModel1(userId, createdAt) {
    const product = await Result.findOne({
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
