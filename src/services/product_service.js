import "../configs/database.js";
import crypto from "crypto";
import { Op } from "sequelize";
import { Product } from "../models/product_model.js";
import { Seller } from "../models/seller_model.js";
import { Review } from "../models/review_model.js";
import { Sequelize, literal } from "sequelize";
import { Order } from "../models/order_model.js";

class ProductService {
  constructor() {}

  async create(data) {
    const productId = crypto.randomUUID();
    const res = await Product.create({ ...data, id: productId });
    return res;
  }

  async findLatest() {
    const res = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res;
  }

  async findCheapest() {
    const res = await Product.findAll({
      order: [["product_price", "ASC"]],
    });
    return res;
  }

  async findMostExpensive() {
    const res = await Product.findAll({
      order: [["product_price", "DESC"]],
    });
    return res;
  }

  async sortByMostOrders() {
    const res = await Product.findAll({
      attributes: [
        "id",
        "product_name",
        "category",
        "color",
        "size",
        "rent_price",
        [
          Sequelize.fn("COUNT", Sequelize.col("Orders.product_id")),
          "total_orders",
        ],
      ],
      include: [
        {
          model: Order,
          attributes: [],
        },
      ],
      group: ["Product.product_id"], // Group by product id
      order: [[literal("total_orders"), "DESC"]],
    });

    return res;
  }

  async sortByHighestRating() {
    const res = await Product.findAll({
      attributes: [
        "id",
        "product_name",
        "seller_id",
        "category",
        "color",
        "size",
        "rent_price",
        "product_price",
        "image",
        "desc",
        [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
      ],
      include: [
        {
          model: Review,
          attributes: [],
        },
      ],
      group: ["Product.product_id"], // Group by product id
      order: [[literal("avg_rating"), "DESC"]],
    });

    return res;
  }

  async readAll() {
    const res = await Product.findAll({
      attributes: [
        ["product_id", "product_id"],
        "product_name",
        "category",
        "color",
        "size",
        "rent_price",
        [
          Sequelize.fn("COUNT", Sequelize.col("Reviews.review_id")),
          "count_num_rating",
        ], // Adjusted column name here
        [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
        [
          Sequelize.fn("COUNT", Sequelize.col("Orders.product_id")),
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
      group: ["Product.product_id"], // Group by product id
    });

    return res;
  }

  async readSearch(keyword, categoryKey) {
    let whereCondition = {
      [Op.or]: [
        {
          [Op.or]: [
            {
              product_name: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              desc: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              category: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
      ],
    };

    // Check if categoryKey is provided and is valid
    if (categoryKey) {
      // Check if categoryKey is valid by querying the database
      const validCategory = await Product.findOne({
        where: { category: categoryKey },
      });

      if (validCategory) {
        whereCondition[Op.or].push({
          category: categoryKey,
        });
      } else {
        // If categoryKey is not valid, return false
        return false;
      }
    }

    const res = await Product.findAll({
      where: whereCondition,
    });
    return res;
  }

  async readFilter(key) {
    const res = await Product.findAll({
      where: {
        [Op.or]: [
          {
            category: key,
          },
          {
            seller_id: key,
          },
        ],
      },
    });
    return res;
  }

  async readOne(productId) {
    const res = await Product.findOne({
      where: { id: productId },
      include: [
        {
          model: Seller,
          attributes: ["seller_name", "city"],
        },
        {
          model: Review,
          where: { product_id: productId },
          limit: 2,
        },
      ],
    });
    return res;
  }

  async update(id, data) {
    const model = await Product.findByPk(id);
    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await Product.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { ProductService };
