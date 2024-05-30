import { body } from "express-validator";
import { Favorite } from "../models/favorite_model.js";
import { Product } from "../models/product_model.js";
import { Customer } from "../models/customer_model.js";

const validateAddFavorite = [
    body("id")
        .custom(async (value) => {
            const existingFavorite = await Favorite.findByPk(value);
            if (existingFavorite) {
                throw new Error("ID sudah terdaftar.");
            }
        }),
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
    body("customer_id")
        .isString()
        .notEmpty()
        .withMessage("Customer ID tidak boleh kosong.")
        .custom(async (value) => {  
            const existingCustomer = await Customer.findByPk(value);
            if (!existingCustomer) {
                throw new Error("Customer dengan ID tersebut tidak ditemukan.");
            }
        })   
];

export default validateAddFavorite;
