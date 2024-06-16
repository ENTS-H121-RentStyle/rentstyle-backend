import "../configs/database.js";
import { Seller } from "../models/seller_model.js";
import { Product } from "../models/product_model.js";
import { Review } from "../models/review_model.js";
import Sequelize from "sequelize";

class ExploreService {
  constructor() {}

  async readAll() {
    const res = await Seller.findAll({
      attributes: [
        "id",
        "seller_name",
        "image",
        [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
        [
          Sequelize.fn("COUNT", Sequelize.col("Products.product_id")),
          "count_num_product",
        ], // Menghitung jumlah produk dari Products.id
      ],
      include: [
        {
          model: Product,
          attributes: [], // Tidak perlu menambahkan atribut apapun dari Product
        },
        {
          model: Review,
          attributes: [], // Tidak perlu menambahkan atribut apapun dari Review
        },
      ],
      group: ["Seller.seller_id"], // Group by Seller id (bukan Seller.seller_id)
      order: [
        [Sequelize.literal("avg_rating"), "DESC"],
        [Sequelize.literal("count_num_product"), "DESC"],
      ],
    });

    return res;
  }

  async readImage() {
    const res = await Seller.findAll({
      attributes: [
        "id",
        "seller_name",
        "image",
        "city",
        [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
        // [
        //   Sequelize.fn("COUNT", Sequelize.col("Products.product_id")),
        //   "count_num_product",
        // ],
      ],
      include: [
        {
          model: Product,
          limit: 3,
          attributes: ["id", "image"],
        },
        {
          model: Review,
          attributes: [], // Review attributes jika diperlukan
        },
      ],
      group: ["Seller.seller_id"], // Group by Seller id (perhatikan penggunaan Seller.id bukan Seller.seller_id)
      order: [[Sequelize.literal("avg_rating"), "DESC"]],
    });
    return res;
  }
}

export { ExploreService };
