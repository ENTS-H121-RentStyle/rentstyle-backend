import "../configs/database.js";
import { User } from "../models/user_model.js";

class UserService {
  constructor() {}

  async create(data) {
    const res = await User.create({ ...data});
    return res;
  }

  async readOne(userId) {
    const res = await User.findByPk(userId);
    return res;
  }

  async update(id, data) {
    const model = await User.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await User.findByPk(id);
    await model.destroy();
    return {};
  }
}

export { UserService };
