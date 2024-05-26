import { Router } from "express";
import Controller from "../controllers/cart_controller.js";
import tokenAuth from "../middleware/auth.js";

const router = Router();

router
  .post("/", tokenAuth, Controller.addCart)
  .get("/:id", tokenAuth, Controller.findUserCart)
  .put("/:id", tokenAuth, Controller.editCart)
  .delete("/:id", tokenAuth, Controller.drop);

export default router;
