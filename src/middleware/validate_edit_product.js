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
  body("seller_id").custom(async (value) => {
    if (value !== undefined) {
      throw new Error("ID penjual tidak boleh diubah.");
    }
  }),
  body("category")
    .optional()
    .isString()
    .isIn(["Adat", "Cosplay", "Formal", "Pesta"])
    .withMessage(
      "Kategori harus salah satu dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"
    ),
  body("color")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Warna tidak boleh kosong."),
  body("desc")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Deskripsi tidak boleh kosong."),
  body("size")
    .isString()
    .notEmpty()
    .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Size tidak boleh kosong."),
  body("rent_price")
    .optional()
    .isNumeric()
    .withMessage("Harga sewa harus berupa angka."),
  body("product_price")
    .optional()
    .isNumeric()
    .withMessage("Harga produk harus berupa angka."),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      return true;
    }
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const maxFileSize = 1 * 1024 * 1024; // 1MB
    const fileExtension = req.file.originalname.split(".").pop();
    const fileSize = req.file.size;
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error("File harus berupa gambar (jpg, jpeg, atau png).");
    }
    if (fileSize > maxFileSize) {
      throw new Error("Ukuran file tidak boleh lebih dari 1MB.");
    }
    return true;
  }),
];

export default validateEditProduct;
