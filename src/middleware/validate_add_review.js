import { body } from "express-validator";
import { Review } from "../models/review_model.js";

const validateAddReview = [
    body("order_id")
        .isString()
        .notEmpty()
        .withMessage("ID tidak boleh kosong."),

    body("product_id")
        .isUUID()
        .custom(async (value) => {
        const review = await Review.findOne({ where: { product_id: value } });
        if (review) {
            return Promise.reject("ID produk sudah memiliki review.");
        }
    }),

    body("user_id")
        .isString()
        .notEmpty()
        .withMessage("ID tidak boleh kosong."),

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