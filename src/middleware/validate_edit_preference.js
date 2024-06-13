import { body } from "express-validator";
import { Product } from "../models/product_model.js";

const validateEditPreference = [
  body("id").custom((value) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("user_id").custom((value) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("size")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Size tidak boleh kosong"),
  body("category")
    .optional()
    .isArray()
    .notEmpty()
    .withMessage("Kategori tidak boleh kosong")
    .custom((value) => {
      const validCategories = ["Adat", "Cosplay", "Formal", "Pesta"];
      if (Array.isArray(value)) {
        if (value.length > 3) {
          throw new Error(
            "Jumlah kategori dalam array tidak boleh lebih dari 3"
          );
        }
        for (let category of value) {
          if (!validCategories.includes(category)) {
            throw new Error(
              "Kategori harus  dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"
            );
          }
        }
      } else {
        throw new Error("Kategori harus berupa array");
      }
    }),
  body("color")
    .optional()
    .isArray()
    .notEmpty()
    .custom(async (value) => {
      const validateColor = [
        "Abu-abu",
        "Biru",
        "Coklat",
        "Hijau",
        "Hitam",
        "Krem",
        "Kuning",
        "Merah",
        "Merah muda",
        "Oranye",
        "Putih",
        "Ungu",
      ];
      if (Array.isArray(value)) {
        if (value.length > 3) {
          throw new Error("Jumlah Warna tidak boleh lebih dari 3");
        }
        for (let category of value) {
          if (!validateColor.includes(category)) {
            throw new Error(
              "Warna harus  dari nilai berikut: Abu-abu, Biru, Coklat, Hijau, Hitam, Krem, Kuning, Merah, Merah muda, Oranye, Putih, Ungu"
            );
          }
        }
      } else {
        throw new Error("Warna harus berupa array");
      }
    }),
];

export default validateEditPreference;
