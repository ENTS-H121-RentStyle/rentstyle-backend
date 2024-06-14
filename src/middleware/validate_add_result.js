import { body } from "express-validator";
import { User } from "../models/user_model.js";

const validateAddResult = [
    body("user_id")
    .isString()
    .notEmpty()
    .withMessage("User ID tidak boleh kosong.")
    .custom(async (value) => {  
        const existingUser = await User.findByPk(value);
        if (!existingUser) {
            throw new Error("User dengan ID tersebut tidak ditemukan.");
        }
    }),   

    body("recommendation")
    .notEmpty()
    .withMessage("Rekomendasi tidak boleh kosong."),

    body("model_type")
    .isString()
    .custom((value) => {
        if (value !== "model1" && value !== "model2") {
            throw new Error("Model type harus model1 atau model2.");
        }
        return true;
    })
];

export default validateAddResult;
