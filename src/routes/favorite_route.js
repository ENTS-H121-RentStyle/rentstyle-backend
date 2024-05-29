import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/favorite_controller.js";


const router = Router();

router
    .post("/", tokenAuth, Controller.addFavorite)
    .get("/", Controller.getAllFavorite)
    .get("/search", Controller.getSearchFavorite)
    .get("/:id", Controller.findUserFavorite)
    .delete("/:id", Controller.dropFavorite)

export default router;