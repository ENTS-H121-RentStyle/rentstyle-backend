import { Router } from "express";
import Controller from '../controllers/product_controller.js'

const router = Router();

router.get("/", Controller.getProduct );

export default router;
