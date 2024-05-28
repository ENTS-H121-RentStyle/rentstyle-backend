import { body } from "express-validator";
import { Product } from "../models/product_model.js";

const validateEditPreference = [
  body("id").custom((value, { req }) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("customer_id").custom((value, { req }) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("size").optional()
    .isString()
    .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
    .notEmpty()
    .withMessage("Size harus salah satu dari nilai berikut: S, M, L, XL"),
  body("category").optional()
    .isString()
    .isIn(["Adat", "Cosplay", "Formal", "Pesta"])
    .notEmpty()
    .withMessage(
      "Kategori harus salah satu dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"
    ),
  body("color").optional()
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const existingColor = await Product.findOne({
        where: { color: value },
      });
      if (!existingColor) {
        throw new Error("Warna tidak ditemukan.");
      }
    }),
];

export default validateEditPreference;
