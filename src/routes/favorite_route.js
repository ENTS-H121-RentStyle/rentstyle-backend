import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/favorite_controller.js";
import validateAddFavorite from "../middleware/validate_add_favorite.js";
import { uploadMiddleware } from "../services/image_service.js";


const router = Router();

router
    .post("/", uploadMiddleware, validateAddFavorite, Controller.addFavorite)
    .get("/search", tokenAuth, Controller.getSearchFavorite)
    .get("/:id", tokenAuth,  Controller.findUserFavorite)
    .delete("/:id", tokenAuth, Controller.dropFavorite)

export default router;