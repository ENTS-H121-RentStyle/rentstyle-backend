import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/favorite_controller.js";
import validateAddFavorite from "../middleware/validate_add_favorite.js";
import { uploadMiddleware } from "../services/image_service.js";


const router = Router();

router
    .post("/", uploadMiddleware, validateAddFavorite, Controller.addFavorite)
    .get("/search", Controller.getSearchFavorite)
    .get("/:id", Controller.findUserFavorite)
    .delete("/:id", Controller.dropFavorite)

export default router;