import "../configs/database.js";
import crypto from "crypto";
import { Product } from "../models/product_model.js";

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

  async readSearch() {
    S
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
    const res = await Product.findByPk(productId);
    return res;
  }

  async update(id, data) {
    const model = await this.findOne(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { ProductService };
