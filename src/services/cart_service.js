import "../configs/database.js";
import { Cart } from "../models/cart_model.js";
import { Product } from "../models/product_model.js";
import crypto from "crypto";

class CartService {
  constructor() {}

  async create(data) {
    const cartId = crypto.randomUUID();
    const res = await Cart.create({ ...data, id: cartId });
    return res;
  }

  async read(userId) {
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

export { CartService };
