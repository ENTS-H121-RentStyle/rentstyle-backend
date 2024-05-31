import { body } from "express-validator";
import { Preference } from "../models/preference_model.js";
import { Product } from "../models/product_model.js";

const validateAddPreference = [
  body("user_id")
    .isString()
    .withMessage("ID harus berupa String")
    .custom(async (value) => {
      const existingPreference = await Preference.findOne({
        where: { user_id: value },
      });
      if (existingPreference) {
        throw new Error("ID sudah memiliki Preference");
      }
    }),
  body("size")
    .isString()
    .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Size harus salah satu dari nilai berikut: S, M, L, XL"),
  body("category")
    .isString()
    .isIn(["Adat", "Cosplay", "Formal", "Pesta"])
    .withMessage(
      "Kategori harus salah satu dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"
    ),
  body("color")
    .isString()
    .custom(async (value) => {
      const existingColor = await Product.findOne({
        where: { color: value },
      });
      if (!existingColor) {
        throw new Error("Warna tidak ditemukan.");
      }
    }),
];

export default validateAddPreference;
