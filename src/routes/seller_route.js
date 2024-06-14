import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import SellerController from "../controllers/seller_controller.js";
import ExploreController from "../controllers/explore_controller.js";
import validateAddSeller from "../middleware/validate_add_seller.js";
import validateEditSeller from "../middleware/validate_edit_seller.js";
import { uploadMiddleware } from "../services/image_service.js";

const router = Router();

router
  .post("/", tokenAuth, uploadMiddleware, validateAddSeller, SellerController.addSeller)
  .get("/explore", ExploreController.getAllExplore) 
  .get("/:id", SellerController.getDetailSeller)
  .put("/:id", tokenAuth, uploadMiddleware, validateEditSeller, SellerController.editSeller)
  .delete("/:id", tokenAuth, SellerController.dropSeller);

export default router;