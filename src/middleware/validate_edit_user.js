import { body } from "express-validator";
import { Op } from "sequelize";
import { User } from "../models/user_model.js";

const validateEditUser = [
  body("id").custom((value) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("email").custom((value) => {
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
    .notEmpty()
    .isIn("Pria", "Wanita")
    .withMessage("Gender tidak boleh kosong"),
];

export default validateEditUser;
