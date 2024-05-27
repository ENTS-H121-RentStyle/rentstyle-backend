import "../configs/database.js";
import { Customer } from "../models/customer_model.js";

class CustomerService {
  constructor() {}

  async create(data) {
    const res = await Customer.create({ ...data});
    return res;
  }

  async readOne(productId) {
    const res = await Customer.findByPk(productId);
    return res;
  }

  async update(id, data) {
    const model = await Customer.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await Customer.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { CustomerService };
