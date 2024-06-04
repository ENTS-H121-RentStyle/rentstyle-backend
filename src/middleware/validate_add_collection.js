import { body } from "express-validator";
import { Collection } from "../models/collection_model.js";
import { Seller } from "../models/seller_model.js";

const validateAddCollection = [
    body("seller_id")
        .isString()
        .notEmpty()
        .withMessage("Seller ID tidak boleh kosong.")
        .custom(async (value) => {
            const existingSeller = await Seller.findByPk(value);
            if (!existingSeller) {
                throw new Error("Seller dengan ID tersebut tidak ditemukan.");
            }
        }),
    body("collection_name")
        .isString()
        .notEmpty()
        .withMessage("Nama collection tidak boleh kosong."),
];

export default validateAddCollection;