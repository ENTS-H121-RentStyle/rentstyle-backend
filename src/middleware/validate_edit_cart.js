import { body } from "express-validator";

const validateEditCart = [
  body("duration").isInt().notEmpty().withMessage("Durasi tidak boleh nol."),
];

export default validateEditCart;
