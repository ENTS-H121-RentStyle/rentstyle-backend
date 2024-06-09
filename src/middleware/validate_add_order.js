import { body } from "express-validator";
import { User } from "../models/user_model.js";
import { Product } from "../models/product_model.js";
import { Op } from "sequelize";
const { productId } = req.body;

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
  body("order_date").notEmpty().isISO8601().toDate(),
  body("return_date").notEmpty().isISO8601().toDate(),
  body("service_fee")
    .notEmpty()
    .isFloat({ min: 0 })
    .custom(async (value) => {
      const product = Product.findOne({
        where: { id: productId },
        attributes: ["rent_price"],
      });
      productPrice = product.rent_price;
      serviceFee = productPrice * 0.01;
      if (Math.abs(value - serviceFee) > 0.001) {
        throw new Error("Biaya Service Fee tidak sah.");
      }
    }),
  body("rent_price")
    .notEmpty()
    .isFloat({ min: 0 })
    .custom(async (value) => {
      const existingProduct = Product.findOne({
        where: { [Op.and]: [{ id: productId }, { rent_price: value }] },
      });
      if (!existingProduct) {
        throw new Error("Produk dengan harga tersebut tidak ditemukan.");
      }
    }),
  body("deposit").notEmpty().isFloat({ min: 0 }),
  body("total_payment").notEmpty().isFloat({ min: 0 }),
  body("note").optional().isString(),
];

export default validateAddOrder;
