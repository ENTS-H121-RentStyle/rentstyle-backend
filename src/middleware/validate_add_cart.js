import { body } from "express-validator";
import { Product } from "../models/product_model.js";
import { User } from "../models/user_model.js";

const validateAddCart = [
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
        throw new Error("Customer dengan ID tersebut tidak ditemukan.");
      }
    }),
];

export default validateAddCart;
