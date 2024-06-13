import "../configs/database.js";
import crypto from "crypto";
import { Result } from "../models/result_model.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
import { Product } from "../models/product_model.js";

class ResultService {
  constructor() {}

  async create(data, modelType) {
    const resultId = crypto.randomUUID();
    const res = await Result.create({ ...data, id: resultId, modelType });
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
    const res = await Product.findAll({
      where: { id: { [Op.in]: product.recomendation } },
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
    const res = await Product.findAll({
      where: { id: { [Op.in]: product.recomendation } },
    });
    return res;
  }
}

export { ResultService };
