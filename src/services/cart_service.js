import "../configs/database.js";
import crypto from "crypto";
import { Cart } from "../models/cart_model.js";
import { Product } from "../models/product_model.js";

class CartService {
  constructor() {}

  async create(data) {
    const cartId = crypto.randomUUID();
    const res = await Cart.create({ ...data, id: cartId });
    return res;
  }

  async readAll(){}

  async readFilter(userId) {
    const res = await Cart.findAll({
      where: { customer_id: userId },
      include: [
        {
          model: Product,
          attributes: ["product_name", 'image'],
        },
      ],
    });
    return res;
  }

  async update(id, data) {
    const model = await this.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { CartService };
