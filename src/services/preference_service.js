import "../configs/database.js";
import { Preference } from "../models/preferensi_model.js";
import { Customer } from "../models/customer_model.js";

class PreferenceService {
  constructor() {}

  async create(data) {
    const res = await Preference.create(data);
    return res;
  }

  async read(prefId) {
    const res = await Preference.findAll({
      where: { pref_id: prefId },
      include: [
        {
          model: Customer,
          attributes: ["name", 'email', 'address'],
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

export { PreferenceService };
