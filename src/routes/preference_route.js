import { Router } from "express";
import Controller from "../controllers/preference_controller.js";
import validateAddPreference from "../middleware/validate_add_preference.js";
import tokenAuth from "../middleware/auth.js";
import validateEditPreference from "../middleware/validate_edit_preference.js";
import izinAuth from "../middleware/izin.js";

const router = Router();

router
  .post("/", tokenAuth, validateAddPreference, Controller.addPreference)
  .get("/", izinAuth, Controller.getAllPreference)
  .get("/:id", tokenAuth, Controller.getPreferenceDetail)
  .put("/:id", tokenAuth, validateEditPreference, Controller.editPreference)
  .delete("/:id", tokenAuth, Controller.dropPreference);

export default router;
