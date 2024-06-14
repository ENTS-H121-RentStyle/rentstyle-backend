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
    })
];

export default validateAddUser;
