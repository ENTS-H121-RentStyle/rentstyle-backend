import "../configs/database.js";
import { Seller } from "../models/seller_model.js";
import { Product } from "../models/product_model.js";
import { Review } from "../models/review_model.js";
import Sequelize from 'sequelize';

class ExploreService {
    constructor() {}

    async readAll() {
        const res = await Product.findAll({
            attributes: [
                ["product_id", "product_id"],
                "image",
                [
                  Sequelize.fn("COUNT", Sequelize.col("Product.product_id")),
                  "count_num_product",
                ],
                [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), "avg_rating"],
            ],
            include: [
                {
                    model: Review,
                    attributes: [],
                },
                {
                    model: Seller,
                    attributes: ["seller_id", "seller_name", "image"], 
                }
            ],
            group: ["Product.product_id", "Seller.seller_id"], 
            order: [
                [Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), 'DESC'],
            ],
        });

        return res;
    }

    async readAll1() {
        const res = await Seller.findAll({
            attributes: [
                "seller_name", "image"
            ], 
            include: [
                {
                    model: Product,
                    limit: 3,
                    attributes: [
                        ["product_id", "product_id"],
                        "image",
                        [
                            Sequelize.fn("AVG", Sequelize.col("Reviews.rating")),
                            "avg_rating",
                        ],
                        [
                            Sequelize.fn("COUNT", Sequelize.col("Product.product_id")),
                            "count_num_product",
                        ],
                    ],
                    include: [
                        {
                            model: Review,
                            attributes: [],
                        },
                    ],
                },
            ],
            // group: ["Seller.seller_id"]
            // order: [[Sequelize.fn("AVG", Sequelize.col("Reviews.rating")), 'DESC']]
        });

        return res;
    }
}



export { ExploreService };
