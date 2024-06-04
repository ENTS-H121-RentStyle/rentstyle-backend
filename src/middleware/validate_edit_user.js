import { body } from "express-validator";
import { Op } from "sequelize";
import { User } from "../models/user_model.js";

const validateEditUser = [
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
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Nama tidak boleh kosong."),
  body("address")
    .optional()
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong."),
  body("phone")
    .optional()
    .notEmpty()
    .isMobilePhone()
    .withMessage("Nomor telepon tidak valid.")
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({
        where: {
          phone: value,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (existingUser) {
        throw new Error("Nomor telepon sudah terdaftar.");
      }
    }),
  body("birth_date")
    .optional()
    .isDate()
    .notEmpty()
    .withMessage("Tanggal lahir harus berupa tanggal"),
  body("gender")
    .optional()
    .notEmpty()
    .isIn("Pria", "Wanita")
    .withMessage("Gender tidak boleh kosong"),

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

export default validateEditUser;
