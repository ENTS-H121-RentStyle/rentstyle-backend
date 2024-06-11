import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/favorite_controller.js";
import validateAddFavorite from "../middleware/validate_add_favorite.js";


const router = Router();

router
    .post("/", tokenAuth, validateAddFavorite, Controller.addFavorite)
    .get("/search", Controller.getSearchFavorite)
    .get("/:id", Controller.findUserFavorite)
    .delete("/:id", Controller.dropFavorite)

export default router;