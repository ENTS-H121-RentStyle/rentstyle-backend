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
    const res = await User.findAll({
      attributes: [
        ["user_id", "user_id"],
        [
          Sequelize.literal(`(
            SELECT pref_id as category_preference
            FROM preferences
            WHERE preferences.user_id = User.user_id
            LIMIT 1
          )`),
          "category_preference",
        ],
        [
          Sequelize.literal(`(
            SELECT category as category_preference
            FROM preferences
            WHERE preferences.user_id = User.user_id
            LIMIT 1
          )`),
          "category_preference",
        ],
        [
          Sequelize.literal(`(
            SELECT color
            FROM preferences
            WHERE preferences.user_id = User.user_id
            LIMIT 1
          )`),
          "color_preference",
        ],
        [
          Sequelize.literal(`(
            SELECT size
            FROM preferences
            WHERE preferences.user_id = User.user_id
            LIMIT 1
          )`),
          "size_preference",
        ],
                [
          Sequelize.fn("COUNT", Sequelize.col("Reviews.review_id")),
          "count_num_rating_user",
        ],
        [
          Sequelize.fn("AVG", Sequelize.col("Reviews.rating")),
          "avg_rating_user",
        ],
        [
          Sequelize.fn("COUNT", Sequelize.col("Orders.order_id")),
          "count_num_order",
        ],
      ],
      include: [
        {
          model: Order,
          attributes: [],
        },
        {
          model: Review,
          attributes: [],
        },
      ],
      group: ["User.user_id", "Orders.order_id"],
    });
  
    return res;
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
