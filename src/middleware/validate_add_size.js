import { body } from "express-validator";
import { Product } from "../models/product_model";

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
  body("size")
    .isString()
    .notEmpty()
    .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])``
    .withMessage("Size tidak boleh kosong."),
  body("stocks")
    .isInt()
    .notEmpty.withMessage("Size harus angka, dan tidak boleh kosong"),
];

export default validateAddCart;
