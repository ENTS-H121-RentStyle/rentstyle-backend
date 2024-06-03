import { body } from "express-validator";
import { Seller } from "../models/seller_model.js";

const validateAddSeller = [ 
    body("user_id")
        .isString()
        .notEmpty()
        .withMessage("ID tidak boleh kosong.")
        .custom(async (value) => {
            const existingSeller = await Seller.findByPk(value);
            if (existingSeller) {
                throw new Error("ID sudah terdaftar.");
            }
        }),

    body("seller_name")
        .isString()
        .notEmpty()
        .withMessage("Nama tidak boleh kosong."),
    body("email")
        .isEmail()
        .notEmpty()
        .withMessage("Email tidak valid.")
        .custom(async (value) => {
            const existingSeller = await Seller.findOne({
                where: { email: value },
            });
            if (existingSeller) {
                throw new Error("Email sudah terdaftar.");
            };
        }),

    body("address")
        .isString()
        .notEmpty()
        .withMessage("Alamat tidak boleh kosong."), 

    body("description")
        .isString()
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong."),

    body("city")
        .isString()
        .isIn(["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"])
        .withMessage("Kota harus salah satu dari nilai berikut: Jakarta, Bogor, Depok, Tangerang, Bekasi"),


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
    })
];

export default validateAddSeller;