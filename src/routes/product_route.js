import { Router } from "express";
import Controller from "../controllers/product_controller.js";
import validateAddProduct from "../middleware/validate_add_product.js";
import validateEditProduct from "../middleware/validate_edit_product.js";
import tokenAuth from "../middleware/auth.js";
import { uploadMiddleware } from "../services/image_service.js";
import izinAuth from "../middleware/izin.js";

const router = Router();

router
  .get("/", izinAuth, Controller.getAllProduct)
  .get("/search", Controller.getSearch)
  .get("/filter", Controller.getFilter)
  .get("/:id", Controller.getDetailProduct)
  .post("/", tokenAuth, uploadMiddleware, validateAddProduct, Controller.addProduct)
  .put("/:id", tokenAuth, uploadMiddleware, validateEditProduct, Controller.editProduct)
  .delete("/:id",tokenAuth, Controller.dropProduct);

export default router;
