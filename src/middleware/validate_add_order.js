import { body } from "express-validator";
import { User } from "../models/user_model.js";
import { Product } from "../models/product_model.js";

const validateAddOrder = [
  body("product_id")
    .notEmpty()
    .isString()
    .custom(async (value) => {
      const existingProduct = await Product.findOne({
        where: { id: value },
      });
      if (!existingProduct) {
        throw new Error("Produk tidak ditemukan.");
      }
    }),
  body("user_id")
    .notEmpty()
    .isString()
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: { id: value },
      });
      if (!existingUser) {
        throw new Error("Produk tidak ditemukan.");
      }
    }),
  body("order_date").notEmpty().isISO8601().toDate().withMessage("Gunakan ISO8601"),
  body("return_date").notEmpty().isISO8601().toDate().withMessage("Gunakan ISO8601"),
  body("service_fee")
    .notEmpty()
    .isFloat({ min: 0 }).withMessage("Service Fee harus float"),
  body("rent_price")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Rent Price harus float"),
  body("rent_duration").notEmpty().isInt(),
  body("deposit")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Deposit harus float"),
  body("total_payment")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Total Payment harus float"),
  body("note").optional().isString(),
];

export default validateAddOrder;
