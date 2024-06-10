import { body } from "express-validator";

const validateEditCart = [
  body("id").custom((value, { req }) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("user_id").custom((value, { req }) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("product_id").custom((value, { req }) => {
    if (value !== undefined) {
      throw new Error("ID tidak boleh diubah.");
    }
    return true;
  }),
  body("duration").isInt().notEmpty().withMessage("Durasi tidak boleh nol."),
];

export default validateEditCart;
