import { body } from "express-validator";
import { Customer } from "../models/customer_model.js";
import { Op } from "sequelize";

const validateEditCustomer = [
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
    .isMobilePhone()
    .withMessage("Nomor telepon tidak valid.")
    .custom(async (value, { req }) => {
      const existingCustomer = await Customer.findOne({
        where: {
          phone: value,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (existingCustomer) {
        throw new Error("Nomor telepon sudah terdaftar.");
      }
    }),
  body("birth_date")
    .optional()
    .isDate()
    .isEmpty()
    .withMessage("Tanggal lahir harus berupa tanggal"),
  body("gender")
    .isEmpty()
    .notEmpty()
    .isIn("Pria", "Wanita")
    .withMessage("Gender tidak boleh kosong"),
];

export default validateEditCustomer;
