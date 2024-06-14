import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/size_controller.js";
import { uploadMiddleware } from "../services/image_service.js";

const router = Router();

router
  .post("/", tokenAuth, uploadMiddleware, Controller.addSize)
  .get("/:id", tokenAuth, Controller.getOneSize)
  .get("/filter", tokenAuth, Controller.findProductSize)
  .delete("/:id", tokenAuth, Controller.dropSize);

export default router;
