import "../configs/database.js";
import crypto from "crypto";
import { Preference } from "../models/preference_model.js";
import { User } from "../models/user_model.js";
import { Sequelize } from "sequelize";
import { Review } from "../models/review_model.js";

class PreferenceService {
  constructor() {}

  async create(data) {
    const prefId = crypto.randomUUID();
    const res = await Preference.create({ ...data, id: prefId });
    return res;
  }

  async readAll() {
    const res = await Preference.findAll({
      include: [
        {
          model: User,
          attributes: [
            [
              Sequelize.fn("COUNT", Sequelize.col("Reviews.review_id")),
              "count_num_rating_user",
            ],
            [
              Sequelize.fn("AVG", Sequelize.col("Reviews.rating")),
              "avg_rating_user",
            ],
          ],
        },
        {
          model: Review,
          attributes: [], // Selecting no attributes from Review
        },
      ],
      group: ["id"], // Group by user_id
    });

    const transformedRes = res.map(item => {
      const user = item.User;
      const reviews = user.Reviews && user.Reviews.length > 0 ? user.Reviews[0].dataValues : {}; // Check if reviews exist
  
      return {
        id: item.dataValues.id, // Change from user.id to item.dataValues.id
        user_id: item.dataValues.user_id, // Change from user.user_id to item.dataValues.user_id
        category: item.category,
        color: item.color,
        size: item.size,
        count_num_rating_user: reviews.count_num_rating_user || 0, // Set default value to 0 if reviews are undefined
        avg_rating_user: reviews.avg_rating_user || null, // Set default value to null if reviews are undefined
      };
    });
  
    return transformedRes;
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
