import { body } from "express-validator";
// import { Product } from "../models/product_model.js";
import { Seller } from "../models/seller_model.js";

const validateAddProduct = [
  body("product_name")
    .isString()
    .notEmpty()
    .withMessage("Nama produk tidak boleh kosong."),
  body("seller_id")
    .notEmpty()
    .withMessage("ID penjual tidak boleh kosong.")
    .custom(async (value) => {
      const existingSeller = await Seller.findOne({
        where: { seller_id: value },
      });
      if (!existingSeller) {
        throw new Error("Penjual tidak ditemukan.");
      }
    }),
  body("category")
    .isString()
    .isIn(["Adat", "Cosplay", "Formal", "Pesta"])
    .withMessage(
      "Kategori harus salah satu dari nilai berikut: Adat, Cosplay, Formal, dan Pesta"
    ),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Gambar harus diupload.");
    }
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error(
        "Format gambar tidak valid. Hanya file JPG, JPEG, PNG yang diperbolehkan."
      );
    }
    const fileSizeInBytes = req.file.size;
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (fileSizeInBytes > maxSizeInBytes) {
      throw new Error("Ukuran gambar terlalu besar. Maksimal 1MB.");
    }
    return true;
  }),
  body("color").isString().notEmpty().withMessage("Warna tidak boleh kosong."),
  body("size")
    .isString()
    .notEmpty()
    .isIn(["S", "M", "L", "XL", "XXL", "XXXL"])
    .withMessage("Size tidak boleh kosong."),
  body("desc")
    .isString()
    .notEmpty()
    .withMessage("Deskripsi tidak boleh kosong."),
  body("rent_price").isNumeric().withMessage("Harga sewa harus berupa angka."),
  body("product_price")
    .isNumeric()
    .withMessage("Harga produk harus berupa angka."),
];

export default validateAddProduct;
