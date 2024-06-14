import { ResultService } from "../services/result_service.js";
import { validationResult } from "express-validator";


const service = new ResultService();

const addResultModel1 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const recommendationString = req.body.recommendation.join(", ");
  
    const transformRequest = await service.create({
      ...req.body,
      recommendation: recommendationString,
      model_type: 'model1'
    });
    
    try {
        console.log(transformRequest)
        const response = await service.create(transformRequest);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const addResultModel2 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const recommendationString = req.body.recommendation.join(", ");
  
    const transformRequest = await service.create({
      ...req.body,
      recommendation: recommendationString,
      model_type: 'model2'
    });
    
    try {
        console.log(transformRequest)
        const response = await service.create(transformRequest);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


const getResultModel1 = async (req, res) => {
    try {
        const { userId, createdAt } = req.query;
        if (!userId || !createdAt) {
            return res.status(400).json({ message: "dibutuhkan userId dan createdAt" });
        }
        const response = await service.readModel1(userId, createdAt);

        if (!response) {
            res.status(404).json({ message: "Result tidak ditemukan" });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getResultModel2 = async (req, res) => {
    try {
        const { userId, createdAt } = req.query;
        if (!userId || !createdAt) {
            return res.status(400).json({ message: "dibutuhkan userId dan createdAt" });
        }
        const response = await service.readModel2(userId, createdAt);

        if (!response) {
            res.status(404).json({ message: "Result tidak ditemukan" });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default { 
    addResultModel1, 
    addResultModel2,
    getResultModel1, 
    getResultModel2
};
