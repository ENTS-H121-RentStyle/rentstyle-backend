import { body } from "express-validator";
import { Preference } from "../models/preference_model.js";
import { Product } from "../models/product_model.js";

const validateAddPreference = [
  body("user_id")
    .notEmpty()
    .withMessage("ID tidak boleh kosong.")
    .custom(async (value) => {
      const existingPreference = await Preference.findOne({
        where: { user_id: value },
      });
      if (existingPreference) {
        throw new Error("ID sudah memiliki Preference");
      }
    }),
  body("size")
    .notEmpty()
    .isString()
    .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Size harus salah satu dari nilai berikut: S, M, L, XL"),
  body("category")
    .notEmpty()
    .withMessage("Kategori tidak boleh kosong.")
    .custom(async (value) => {
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
    .notEmpty()
    .withMessage("Color tidak boleh kosong.")
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

export default validateAddPreference;
