import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/collection_controller.js";
import validateAddCollection from "../middleware/validate_add_collection.js";

const router = Router();

router
    .post("/", tokenAuth, validateAddCollection, Controller.addCollection)
    .delete("/:id", tokenAuth, Controller.dropCollection);

export default router;