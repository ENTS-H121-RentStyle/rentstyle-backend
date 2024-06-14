import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/follow_controller.js";
import validateAddFollow from "../middleware/validate_add_follow.js";
import { uploadMiddleware } from "../services/image_service.js";

const router = Router();

router
  .post("/", tokenAuth, uploadMiddleware, validateAddFollow, Controller.addFollow)
  .get("/following:", tokenAuth, Controller.getOneFollow)
  .get("/filter", tokenAuth, Controller.filterFollow)
  .delete("/:id", tokenAuth, Controller.dropFollow);

export default router;
