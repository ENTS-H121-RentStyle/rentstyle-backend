import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/seller_controller.js";

const router = Router();

router
  .post("/", Controller.addSeller)
  .put("/:id", Controller.editSeller)
  .delete("/:id", Controller.dropSeller);

export default router;

