import { body } from "express-validator";


const validateEditSeller = [
    body("id").custom((value, { req }) => {
        if (value !== undefined) {
            throw new Error("ID tidak boleh diubah.");
        }
        return true;
    }),
    
    body("user_id").custom((value, { req }) => {
        if (value !== undefined) {
            throw new Error("ID User tidak boleh diubah.");
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
        
    body("image")
    .custom((value, { req }) => {
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

export default validateEditSeller;