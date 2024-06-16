import { Router } from "express";
import Controller from "../controllers/result_controller.js";
import validateAddResult from "../middleware/validate_add_result.js";
import izinAuth from "../middleware/izin.js";
import { uploadMiddleware } from "../services/image_service.js";


const router = Router();

router
    .post("/model1", izinAuth, uploadMiddleware, validateAddResult, Controller.addResultModel1)
    .post("/model2", izinAuth, uploadMiddleware, validateAddResult, Controller.addResultModel2)
    .get("/recommendation", Controller.getResultModel)

export default router;