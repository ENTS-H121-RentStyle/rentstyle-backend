import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/size_controller.js";

const router = Router();

router
  .post("/", tokenAuth, Controller.addSize)
  .get("/:id", tokenAuth, Controller.findProductSize)
  .delete("/:id", tokenAuth, Controller.dropSize);

export default router;
