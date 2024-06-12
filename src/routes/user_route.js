import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/user_controller.js";
import validate_add_user from "../middleware/validate_add_user.js";
import validateEditUser from "../middleware/validate_edit_user.js";
import { uploadMiddleware } from "../services/image_service.js";


const router = Router();

router
  .post("/", tokenAuth, uploadMiddleware, validate_add_user, Controller.addUser)
  .get("/:id", tokenAuth, Controller.findDetailUser)
  .put("/:id", tokenAuth, uploadMiddleware, validateEditUser,  Controller.editUser)
  .delete("/:id", tokenAuth, Controller.dropUser);

export default router;
