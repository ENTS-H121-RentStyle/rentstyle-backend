import "../configs/database.js";
import crypto from "crypto";
import { Preference } from "../models/preference_model.js";
import { User } from "../models/user_model.js";

class PreferenceService {
  constructor() {}

  async create(data) {
    const prefId = crypto.randomUUID();
    const res = await Preference.create({ ...data, id: prefId });
    return res;
  }

  async readAll() {
    const res = await Preference.findAll();
    return res;
  }

  async readOne(prefId) {
    const res = await Preference.findByPk({
      where: { pref_id: prefId },
      include: [
        {
          model: User,
          attributes: ["name", "email", "address", "birth_date", "phone"],
        },
      ],
    });
    return res;
  }

  async update(id, data) {
    const model = await Preference.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await Preference.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { PreferenceService };
