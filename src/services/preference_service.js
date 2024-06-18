import "../configs/database.js";
import crypto from "crypto";
import { Preference } from "../models/preference_model.js";
import { User } from "../models/user_model.js";
import { Sequelize } from "sequelize";
import { Review } from "../models/review_model.js";
import { Order } from "../models/order_model.js";

class PreferenceService {
  constructor() {}

  async create(data) {
    const prefId = crypto.randomUUID();
    const categoryString = data.category.join(", ");
    const colorString = data.color.join(", ");
    const res = await Preference.create({
      ...data,
      id: prefId,
      category: categoryString,
      color: colorString,
    });
    return res;
  }

  async readAll() {
    const res = await Preference.findAll({
      include: [
        {
          model: User,
          attributes: [
            [
              Sequelize.fn("COUNT", Sequelize.col("User->Reviews.review_id")),
              "count_num_rating_user",
            ],
            [
              Sequelize.fn("AVG", Sequelize.col("User->Reviews.rating")),
              "avg_rating_user",
            ],
            [
              Sequelize.fn("COUNT", Sequelize.col("User->Orders.order_id")),
              "count_num_order",
            ],
          ],
          include: [
            {
              model: Review,
              attributes: [],
            },
            {
              model: Order,
              attributes: [], 
            },
          ],
        },
      ],
      group: [
        "Preferences.pref_id",
        "Preferences.user_id",
        "Preferences.category",
        "Preferences.color",
        "Preferences.size",
        "User.user_id",
      ],
    });

    const transformedRes = res.map((item) => {
      const user = item.User;
      const reviews =
        user.Reviews && user.Reviews.length > 0
          ? user.Reviews[0].dataValues
          : {}; // Check if reviews exist

      return {
        pref_id: item.dataValues.id, // Change from user.id to item.dataValues.id
        user_id: item.dataValues.user_id, // Change from user.user_id to item.dataValues.user_id
        category_preference: item.category,
        color_preference: item.color,
        size_preference: item.size,
        count_num_rating_user: reviews.count_num_rating_user || 0, // Set default value to 0 if reviews are undefined
        avg_rating_user: reviews.avg_rating_user || null, // Set default value to null if reviews are undefined
        count_num_order: item.count_num_order || 0
      };
    });

    return transformedRes;
  }

  async readOne(userId) {
    const res = await Preference.findOne({
      where: { user_id: userId },
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
