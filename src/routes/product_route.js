import { Router } from "express";
import Controller from "../controllers/product_controller.js";
import validateAddProduct from "../middleware/validate_add_product.js";
import validateEditProduct from "../middleware/validate_edit_product.js";
import tokenAuth from "../middleware/auth.js";


const router = Router();

router
  .get("/", Controller.getAllProduct)
  .get("/search", Controller.getSearch)
  .get("/filter", Controller.getFilter)
  .get("/:id", Controller.getDetailProduct)
  .post("/", tokenAuth, validateAddProduct, Controller.addProduct)
  .put("/:id", tokenAuth, validateEditProduct, Controller.editProduct)
  .delete("/:id", tokenAuth, Controller.dropProduct);

export default router;
