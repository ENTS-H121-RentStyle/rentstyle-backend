import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/seller_controller.js";
import validateAddSeller from "../middleware/validate_add_seller.js";
import validateEditSeller from "../middleware/validate_edit_seller.js";

const router = Router();

router
  .post("/", tokenAuth, validateAddSeller, Controller.addSeller)
  .get("/:id", Controller.getDetailSeller)
  .put("/:id", tokenAuth, validateEditSeller, Controller.editSeller)
  .delete("/:id", tokenAuth, Controller.dropSeller);

export default router;

