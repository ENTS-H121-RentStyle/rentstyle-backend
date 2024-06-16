import "../configs/database.js";
import crypto from "crypto";
import { Seller } from "../models/seller_model.js";
import { Op } from "sequelize";

class SellerService {
  constructor() {}

  async create(data) {
    const sellerId = crypto.randomUUID();
    const res = await Seller.create({ ...data, id: sellerId });
    return res;
  }

  async readOne(keyId) {
    const res = await Seller.findOne({
      where: {
        [Op.or]: [
          { id: keyId },
          {
            user_id: keyId,
          },
        ],
      },
    });
    return res;
  }

  async update(id, data) {
    const model = await Seller.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await Seller.findByPk(id);
    await model.destroy();
    return {
      deleted: true,
    };
  }
}

export { SellerService };
