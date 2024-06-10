import "../configs/database.js";
import crypto from "crypto";
import { Op } from "sequelize";
import { Product } from "../models/product_model.js";
import { Seller } from "../models/seller_model.js";
import { Review } from "../models/review_model.js";

class ProductService {
  constructor() {}

  async create(data) {
    const productId = crypto.randomUUID();
    const res = await Product.create({ ...data, id: productId });
    return res;
  }

  async readAll() {
    const res = await Product.findAll();
    return res;
  }

  async readSearch(keyword, categoryKey) {
    const res = await Product.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              {
                product_name: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                desc: {
                  [Op.like]: `%${keyword}%`,
                },
              },
              {
                category: {
                  [Op.like]: `%${keyword}%`,
                },
              },
            ],
          },
          {
            category: categoryKey,
          },
        ],
      },
    });
    return res;
  }

  async readFilter(key) {
    const res = await Product.findAll({
      where: {
        [Op.or]: [
          {
            category: key,
          },
          {
            seller_id: key,
          },
        ],
      },
    });
    return res;
  }

  async readOne(productId) {
    const res = await Product.findOne({
      where: { id: productId },
      include: {
        model: Seller,
        attributes: ["seller_name", "city"],
      },
      include: {
        model: Review,
        limit: 2,
      },
    });
    return res;
  }

  async update(id, data) {
    const model = await Product.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await Product.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { ProductService };
