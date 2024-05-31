import "../configs/database.js";
import crypto from "crypto";
import { Size } from "../models/size_model.js";

class SizeService {
  constructor() {}

  async create(data) {
    const cartId = crypto.randomUUID();
    const res = await Size.create({ ...data, id: cartId });
    return res;
  }

  async readFilter(userId) {
    const res = await Size.findAll({
      where: { customer_id: userId },
    });
    return res;
  }

  async delete(id) {
    const model = await Size.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { SizeService };
