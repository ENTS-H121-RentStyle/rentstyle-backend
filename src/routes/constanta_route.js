import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/constanta_controller.js";

const router = Router();

router
  .get("/:id", tokenAuth, Controller.getConstanta)

export default router;
