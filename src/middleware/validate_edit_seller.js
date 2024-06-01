import { body } from "express-validator";


const validateEditSeller = [
    body("id").custom((value, { req }) => {
        if (value !== undefined) {
            throw new Error("ID tidak boleh diubah.");
        }
        return true;
    }),
    body("email").custom((value, { req }) => {
        if (value !== undefined) {
            throw new Error("Email tidak boleh diubah.");
        }
        return true;
    }),
    body("seller_name")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Nama tidak boleh kosong."),
    body("address") 
        .optional()
        .notEmpty()
        .withMessage("Alamat tidak boleh kosong."),
    body("description")
        .optional()
        .notEmpty()
        .withMessage("Deskripsi tidak boleh kosong."),
    body("city")
        .optional()
        .isString()
        .isIn(["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"])
        .withMessage("Kota harus salah satu dari nilai berikut: Jakarta, Bogor, Depok, Tangerang, Bekasi"),
];

export default validateEditSeller;