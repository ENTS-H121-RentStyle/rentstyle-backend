import "../configs/database.js";
import crypto from "crypto";
import { Order } from "../models/order_model.js";
import { Op } from "sequelize";
import { User } from "../models/user_model.js";

class OrderService {
  constructor() {}

  async create(data) {
    const orderId = 'order_id' in data? data.order_id : crypto.randomUUID();
    const status = 'status_order' in data? data.status_order : "Belum bayar";
    const res = await Order.create({
      ...data,
      id: orderId,
      order_status: status,
    });
    return res;
  }

  async readAll(){
    const res = await Order.findAll()
    return res;
  }

  async readOne(orderId) {
    const res = await Order.findByPk(orderId, {
      include: {
        model: User, // Model yang ingin Anda sertakan
        attributes: ['address'], // Bidang yang ingin Anda ambil dari model User
      }
    });
    return res;
  }
  

  async readFilter(userId, status) {
    const res = await Order.findAll({
      where: { [Op.and]: [{ user_id: userId }, { order_status: status }] },
    });
    return res;
  }

  async update(id, data) {
    const model = await Order.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await Order.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { OrderService };
