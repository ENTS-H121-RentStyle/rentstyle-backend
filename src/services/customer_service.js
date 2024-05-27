import "../configs/database.js";
import crypto from "crypto";
import { Customer } from "../models/customer_model.js";

class CustomerService {
  constructor() {}

  async create(data) {
    const prefId = crypto.randomUUID();
    const res = await Customer.create({ ...data, pref_id: prefId });
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

export { CustomerService };
