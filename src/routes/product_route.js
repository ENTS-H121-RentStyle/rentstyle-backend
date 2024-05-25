import { Router } from "express";
import ProductController from '../controllers/product_controller.js'
const router = Router();

router.get("/test", ProductController.getProduct );

export default router;
