import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/cart_controller.js";
import validateAddCart from "../middleware/validate_add_cart.js";

const router = Router();

router
  .post("/", tokenAuth, validateAddCart, Controller.addCart)
  .get("/:id", tokenAuth, Controller.findUserCart)
  .put("/:id", tokenAuth, Controller.editCart)
  .delete("/:id", tokenAuth, Controller.dropCart);

export default router;
