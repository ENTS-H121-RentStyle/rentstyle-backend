import { body, param } from "express-validator";
import { Customer } from "../models/customer_model.js";
import { Op } from "sequelize";

const validateEditCustomer = [
  body("name").optional().isString().notEmpty().withMessage("Nama tidak boleh kosong."),
  body("address").optional().isString().notEmpty().withMessage("Alamat tidak boleh kosong."),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Nomor telepon tidak valid.")
    .custom(async (value, { req }) => {
      const existingCustomer = await Customer.findOne({
        where: {
          phone: value,
          id: {
            [Op.ne]: req.params.id
          }
        }
      });
      if (existingCustomer) {
        throw new Error("Nomor telepon sudah terdaftar.");
      }
    }),
];

export default validateEditCustomer;
