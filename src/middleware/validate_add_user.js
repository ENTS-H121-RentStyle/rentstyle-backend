import { body } from "express-validator";
import { User } from "../models/user_model.js";

const validateAddUser = [
  body("id")
    .isString()
    .withMessage("ID harus berupa String.")
    .custom(async (value) => {
      const existingUser = await User.findByPk(value);
      if (existingUser) {
        throw new Error("ID sudah terdaftar.");
      }
    }),
  body("name").isString().notEmpty().withMessage("Nama tidak boleh kosong."),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email tidak valid.")
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error("Email sudah terdaftar.");
      }
    }),
  body("address")
    .isString()
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong."),
  body("phone")
    .isMobilePhone()
    .withMessage("Nomor telepon tidak valid.")
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: { phone: value },
      });
      if (existingUser) {
        throw new Error("Nomor telepon sudah terdaftar.");
      }
    }),
  body("birth_date")
    .notEmpty()
    .isDate()
    .withMessage("Tanggal lahir harus berupa tanggal"),
  body("gender")
    .notEmpty()
    .isIn("Pria", "Wanita")
    .withMessage("Gender tidak boleh kosong"),
];

export default validateAddUser;
