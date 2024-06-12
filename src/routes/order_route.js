import { Router } from "express";
import Controller from "../controllers/order_controller.js";
import validateAddOrder from "../middleware/validate_add_order.js";
import tokenAuth from "../middleware/auth.js";
import izinAuth from "../middleware/izin.js";

const router = Router();

router
  .get("/filter", tokenAuth, Controller.getFilter)
  .get("/", izinAuth, Controller.getAllOrder)
  .get("/:id", tokenAuth, Controller.getDetailOrder)
  .post("/", tokenAuth, validateAddOrder, Controller.addOrder)
  .put("/:id", tokenAuth, Controller.editOrder)
  .delete("/:id", tokenAuth, Controller.dropOrder);

export default router;
