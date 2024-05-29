import "../configs/database.js";
import crypto from "crypto";
import { Favorite } from "../models/favorite_model.js";
import { Product } from "../models/product_model.js";

class FavoriteService {
    constructor() {};

    async create(data) {
        const favoriteId = crypto.randomUUID();
        const res = await Favorite.create({ ...data, id: favoriteId });
        return res;
    };

    async readAll() {
        const res = await Favorite.findAll();
        return res;
    };

    async readSearch(keyword) {
        const res = await Favorite.findAll({
            where: {
                product_id: {
                  [Op.like]: "%${productId}%",
                },
            },
            include: [
                {
                  model: Product,
                  attributes: ["product_name"],
                  where: {
                        [Op.or]: [
                            { product_name: { [Op.like]: "%${keyword}%" } },
                        ],
                    },
                },
            ],
        });
        return res;
    };

    async readFilter(userId) {
        const res = await Favorite.findAll({
            where: {
                customer_id: userId
            },
            include: [{
                model: Product,
                attributes: ["product_name", 'image', "price"],
            }],
        });

        return res;
    };

    async update(id, data) {
        const model = await Cart.findByPk(id);
        const res = await model.update(data);
        return res;
      };
    
      async delete(id) {
        const model = await Cart.findByPk(id);
        await model.destroy();
        return { deleted: true };
      };
};

export { FavoriteService };