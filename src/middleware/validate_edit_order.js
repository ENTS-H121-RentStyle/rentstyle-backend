import { body } from "express-validator";

const validateEditOrder = [
    body("order_status")
    .isString()
    .notEmpty()
    .isIn(["Dikemas", "Disewa", "Pengembalian", "Selesai", "Dibatalkan"])
];

export default validateEditOrder;
