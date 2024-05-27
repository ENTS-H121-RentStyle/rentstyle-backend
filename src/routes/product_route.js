import { Router } from "express";
import Controller from "../controllers/product_controller.js";

const router = Router();

router
  .get("/", Controller.getAllProduct)
  .get("/:id", Controller.getDetailProduct)
  .post("/", Controller.addProduct)
  .put("/:id", Controller.editProduct)
  .delete("/:id", Controller.dropProduct);

export default router;
