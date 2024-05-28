import { body } from "express-validator";
import { Customer } from "../models/customer_model.js";

const validateCustomer = [
  body("id")
    .isString()
    .withMessage("ID harus berupa angka.")
    .custom(async (value) => {
      const existingCustomer = await Customer.findByPk(value);
      if (existingCustomer) {
        throw new Error("ID sudah terdaftar.");
      }
    }),
  body("name").isString().notEmpty().withMessage("Nama tidak boleh kosong."),
  body("email")
    .isEmail()
    .withMessage("Email tidak valid.")
    .custom(async (value) => {
      const existingCustomer = await Customer.findOne({
        where: { email: value },
      });
      if (existingCustomer) {
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
      const existingCustomer = await Customer.findOne({
        where: { phone: value },
      });
      if (existingCustomer) {
        throw new Error("Nomor telepon sudah terdaftar.");
      }
    }),
];

export default validateCustomer;
