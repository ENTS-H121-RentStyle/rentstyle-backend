import { body } from "express-validator";
import { Review } from "../models/review_model.js";
import { Order } from "../models/order_model.js";
import { Product } from "../models/product_model.js";
import { User } from "../models/user_model.js";

const validateAddReview = [
    body("order_id")
        .isString()
        .notEmpty()
        .withMessage("ID tidak boleh kosong.")
        .custom(async (value) => {
            const existingOrder = await Order.findByPk(value);
            if (!existingOrder) {
                throw new Error("Order dengan ID tersebut tidak ditemukan.");
            }
        }),

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
                throw new Error("User dengan ID tersebut tidak ditemukan.");
            }
        }),   

    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating harus diantara 1 dan 5."),

    body("review")
    .isString()
    .notEmpty()
    .withMessage("Review tidak boleh kosong."),

    body("image")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Gambar harus diupload.");
            }
            const allowedExtensions = ["jpg", "jpeg", "png"];
            const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error("Format gambar tidak valid. Hanya file JPG, JPEG, PNG yang diperbolehkan.");
            }
            const fileSizeInBytes = req.file.size;
            const maxSizeInBytes = 1 * 1024 * 1024;
            if (fileSizeInBytes > maxSizeInBytes) {
                throw new Error("Ukuran gambar terlalu besar. Maksimal 1MB.");
            }
            return true;
        }),
];

export default validateAddReview;