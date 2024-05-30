import { body } from "express-validator";
import { Product } from "../models/product_model.js";
 
const validateAddProduct = [
    body("id")
    .custom(async (value) => {
        const existingProduct = await Product.findByPk(value);
        if (existingProduct) {
            throw new Error("ID sudah terdaftar.");
        }
    }),

    body("product_name")
    .isString()
    .notEmpty()
    .withMessage("Nama produk tidak boleh kosong."),

    body("seller_id")
    .notEmpty()
    .withMessage("ID penjual tidak boleh kosong.")
    .custom(async (value) => {
        const existingSeller = await Product.findOne({
            where: { seller_id: value },
        });
        if (!existingSeller) {
            throw new Error("Penjual tidak ditemukan.");
        }
    }),

    body("category")
    .isString()
    .isIn(["Adat", "Cosplay", "Formal", "Pesta"])
    .withMessage("Kategori harus salah satu dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"),
    
    // body("image")
    //     .isString()
    //     .custom((value, { req }) => {
    //         if (!req.file) {
    //             throw new Error("Gambar tidak ditemukan.");
    //         }
    //         const allowedExtensions = ["jpg", "jpeg", "png"];
    //         const fileExtension = value.split(".").pop();
    //         if (!allowedExtensions.includes(fileExtension)) {
    //             throw new Error("Format gambar tidak valid. Harus berupa JPG, JPEG, atau PNG.");
    //         }
    //         const fileSizeLimit = 1 * 1024 * 1024; // 1MB
    //         if (req.file.size > fileSizeLimit) {
    //             throw new Error("Ukuran gambar terlalu besar. Maksimal 1MB.");
    //         }
    //         return true;
    //     }),

    body("color")
        .isString()
        .notEmpty()
        .withMessage("Warna tidak boleh kosong."),

    body("size")
        .isString()
        .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
        .withMessage("Size harus salah satu dari nilai berikut: S, M, L, XL"),

    body("desc")
        .isString()
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong."),

    body("rent_price")
        .isNumeric()
        .withMessage("Harga sewa harus berupa angka."),

    body("product_price")
        .isNumeric()
        .withMessage("Harga produk harus berupa angka."),
]

export default validateAddProduct;
