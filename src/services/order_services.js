import "../configs/database.js";
import crypto from "crypto";
import { Order } from "../models/order_model.js";

class OrderService {
  constructor() {}

  async create(data) {
    const orderId = crypto.randomUUID();
    const res = await Order.create({ ...data, id: orderId });
    return res;
  }

  async readOne(orderId) {
    const res = await Order.findByPk(orderId);
    return res;
  }

  async readFilter(userId) {
    const res = await Order.findAll({
      where: { user_id: userId },
    });
    return res;
  }

  async delete(id) {
    const model = await Order.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { OrderService };
