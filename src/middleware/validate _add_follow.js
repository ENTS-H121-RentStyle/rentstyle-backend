import { body } from "express-validator";
import { User } from "../models/user_model";
import { Seller } from "../models/seller_model";

const validateAddFollow = [
  body("follower_id")
    .isString()
    .notEmpty()
    .withMessage("Product ID tidak boleh kosong.")
    .custom(async (value) => {
      const existingUser = await User.findByPk(value);
      const existingSeller = await Seller.findByPk(value);
      if (!existingUser && !existingSeller) {
        throw new Error("User atau Seller dengan ID tersebut tidak ditemukan.");
      }
    }),
  body("followed_id")
    .isString()
    .notEmpty()
    .withMessage("Size tidak boleh kosong.")
    .custom(async (value) => {
      const existingUser = await User.findByPk(value);
      const existingSeller = await Seller.findByPk(value);
      if (!existingUser && !existingSeller) {
        throw new Error("User atau Seller dengan ID tersebut tidak ditemukan.");
      }
    }),
];

export default validateAddFollow;
