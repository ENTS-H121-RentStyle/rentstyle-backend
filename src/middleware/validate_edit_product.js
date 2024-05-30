import { body } from "express-validator";
import { Product } from "../models/product_model.js";

const validateEditProduct = [
    body("id").custom((value, { req }) => {
        if (value !== undefined) {
            throw new Error("ID tidak boleh diubah.");
        }
        return true;
    }),

    body("product_name")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Nama produk tidak boleh kosong."),

    body("seller_id")
    .custom(async (value) => {
        if (value !== undefined) {
            throw new Error("ID penjual tidak boleh diubah.");
        }
    }),

    body("category")
        .optional()
        .isString()
        .isIn(["Adat", "Cosplay", "Formal", "Pesta"])
        .withMessage("Kategori harus salah satu dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"),

    body("color")   
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Warna tidak boleh kosong."),

    body("size")
        .optional()
        .isString()
        .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
        .withMessage("Size harus salah satu dari nilai berikut: S, M, L, XL"),

    body("desc")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong."),

    body("rent_price")
        .optional()
        .isNumeric()
        .withMessage("Harga sewa harus berupa angka."),

    body("product_price")
        .optional()
        .isNumeric()
        .withMessage("Harga produk harus berupa angka."),
];

export default validateEditProduct;