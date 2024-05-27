import { Router } from "express";
import Controller from "../controllers/preference_controller.js";

const router = Router();

router
  .post("/", Controller.addPreference)
  .get("/", Controller.getAllPreference)
  .get("/:id", Controller.getPreferenceDetail)
  .put("/:id", Controller.editPreference)
  .delete("/:id", Controller.dropPreference);

export default router;
