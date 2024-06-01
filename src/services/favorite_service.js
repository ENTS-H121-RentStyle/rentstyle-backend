import "../configs/database.js";
import crypto from "crypto";
import { Op } from "sequelize";
import { Favorite } from "../models/favorite_model.js";
import { Product } from "../models/product_model.js";

class FavoriteService {
  constructor() {}

  async create(data) {
    const favoriteId = crypto.randomUUID();
    const res = await Favorite.create({ ...data, id: favoriteId });
    return res;
  }

  async readAll() {
    const res = await Favorite.findAll();
    return res;
  }

  async readSearch(userId, keyword) {
    const res = await Favorite.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          attributes: ["product_name", "image", "rent_price", "product_price"],
          where: {
            [Op.or]: [
              { product_name: { [Op.like]: `%${keyword}%` } },
              { desc: { [Op.like]: `%${keyword}%` } },
              { category: { [Op.like]: `%${keyword}` } },
            ],
          },
        },
      ],
    });
    return res;
  }

  async readFilter(userId) {
    const res = await Favorite.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Product,
          attributes: ["product_name", "image", "rent_price", "product_price"],
        },
      ],
    });

    return res;
  }

  async delete(id) {
    const model = await Favorite.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { FavoriteService };
