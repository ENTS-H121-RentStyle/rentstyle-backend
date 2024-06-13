import { Router } from "express";
import Controller from "../controllers/result_controller.js";
import validateAddResult from "../middleware/validate_add_result.js";
import izinAuth from "../middleware/izin.js";


const router = Router();

router
    .post("/model1", izinAuth, validateAddResult, Controller.addResultModel1)
    .post("/model2", izinAuth, validateAddResult, Controller.addResultModel2)
    .get("/model1", izinAuth, Controller.getResultModel1)
    .get("/model2", izinAuth, Controller.getResultModel2);

export default router;