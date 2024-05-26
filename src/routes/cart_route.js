import { Router } from "express";
import Controller from "../controllers/cart_controller.js";
import tokenAuth from "../middleware/auth.js";

const router = Router();

router
  .post("/", tokenAuth, Controller.addCart)
  .get("/:id", Controller.findUserCart)
  .put("/:id", Controller.editCart)
  .delete("/:id", Controller.drop);

export default router;
