import { body } from "express-validator";
import { Favorite } from "../models/favorite_model.js";
import { Product } from "../models/product_model.js";
import { User } from "../models/user_model.js";

const validateAddFavorite = [
    body("product_id")
        .isString()
        .notEmpty()
        .withMessage("Product ID tidak boleh kosong.")
        .custom(async (value) => {
            const existingProduct = await Product.findByPk(value);
            if (!existingProduct) {
                throw new Error("Product dengan ID tersebut tidak ditemukan.");
            }
        }),
    body("user_id")
        .isString()
        .notEmpty()
        .withMessage("User ID tidak boleh kosong.")
        .custom(async (value) => {  
            const existingUser = await User.findByPk(value);
            if (!existingUser) {
                throw new Error("User dengan ID tersebut tidak ditemukan.");
            }
        })   
];

export default validateAddFavorite;
