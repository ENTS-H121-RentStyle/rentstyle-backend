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
  body("order_date").notEmpty().isISO8601().toDate(),
  body("return_date").notEmpty().isISO8601().toDate(),
  body("service_fee")
    .notEmpty()
    .isFloat({ min: 0 })
    .custom(async (value, { req }) => {
      const { productId } = req.body;
      const existingProduct = await Product.findOne({
        where: { id: productId },
        attributes: ["rent_price"],
      });
      const serviceFee = existingProduct.rent_price * 0.1;
      if (Math.abs(value - serviceFee) > Number.EPSILONcr) {
        throw new Error("Service Fee tidak sah.");
      }
    }),
  body("rent_price")
    .notEmpty()
    .isFloat({ min: 0 })
    .custom(async (value, { req }) => {
      const { productId } = req.body;
      const { rent_duration } = req.body;
      const existingProduct = await Product.findOne({
        where: { id: productId },
        attributes: ["rent_price"],
      });
      const rentPrice = existingProduct.rent_price * rent_duration;
      if (Math.abs(value - rentPrice) > Number.EPSILON) {
        throw new Error("Rent Price tidak sah.");
      }
    }),
  body("rent_duration").notEmpty().isInt(),
  body("deposit")
    .notEmpty()
    .isFloat({ min: 0 })
    .custom(async (value, { req }) => {
      const { productId } = req.body;
      const existingProduct = await Product.findOne({
        where: { id: productId },
        attributes: ["product_price"],
      });
      if (!existingProduct) {
        throw new Error("Produk dengan harga tersebut tidak ditemukan.");
      }
      const productPrice = existingProduct.product_price;
      let const_deposit;
      if (productPrice <= 500000) {
        const_deposit = 0.25;
      }
      if (productPrice <= 1000000) {
        const_deposit = 0.2;
      }
      if (productPrice <= 5000000) {
        const_deposit = 0.15;
      }
      if (productPrice <= 10000000) {
        const_deposit = 0.1;
      }
      const deposito = productPrice * const_deposit;
      if (Math.abs(value - deposito) > Number.EPSILON) {
        throw new Error("Deposit Fee tidak sah.");
      }
    }),
  body("total_payment")
    .notEmpty()
    .isFloat({ min: 0 })
    .custom(async (value, { req }) => {
      const { rent_price } = req.body;
      const { service_fee } = req.body;
      const { deposit } = req.body;
      const totalPayment = rent_price + service_fee + deposit;
      if (Math.abs(value - totalPayment) > Number.EPSILON) {
        throw new Error("Deposit Fee tidak sah.");
      }
    }),
  body("note").optional().isString(),
];

export default validateAddOrder;
