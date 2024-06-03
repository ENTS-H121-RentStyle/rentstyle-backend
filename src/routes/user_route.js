import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/user_controller.js";
import validate_add_user from "../middleware/validate_add_user.js";
import validate_edit_user from "../middleware/validate_edit_user.js";
import { uploadMiddleware } from "../services/image_service.js";

const router = Router();

router
  .post("/", uploadMiddleware, validate_add_user, Controller.addUser)
  .get("/:id", Controller.findDetailUser)
  .put("/:id", uploadMiddleware, validate_edit_user, Controller.editUser)
  .delete("/:id", Controller.dropUser);

export default router;
