import { Router } from "express";
import Controller from "../controllers/result_controller.js";
import validateAddResult from "../middleware/validate_add_result.js";
import izin from "../middleware/izin.js";


const router = Router();

router
    .post("/model1", izin, validateAddResult, Controller.addResultModel1)
    .post("/model2", izin, validateAddResult, Controller.addResultModel2)
    .get("/model1", Controller.getResultModel1)
    .get("/model2", Controller.getResultModel2);

export default router;