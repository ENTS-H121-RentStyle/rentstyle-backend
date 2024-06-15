import { ResultService } from "../services/result_service.js";
import { validationResult } from "express-validator";

const service = new ResultService();

const addResultModel1 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, recommendation, ...otherFields } = req.body;

  if (!user_id || !recommendation) {
    return res.status(400).json({ message: "user_id and recommendation are required" });
  }

  const recommendationString = recommendation.join(", ");

  try {
    const response = await service.create({
      user_id,
      recommendation: recommendationString,
      model_type: "model1",
      ...otherFields,
    });
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

  const { user_id, recommendation, ...otherFields } = req.body;

  if (!user_id || !recommendation) {
    return res.status(400).json({ message: "user_id and recommendation are required" });
  }

  const recommendationString = recommendation.join(", ");

  try {
    const response = await service.create({
      user_id,
      recommendation: recommendationString,
      model_type: "model2",
      ...otherFields,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getResultModel1 = async (req, res) => {
  try {
    const { userId, createdAt } = req.query;

    if (!userId || !createdAt) {
      return res.status(400).json({ message: "userId dan createdAt diperlukan" });
    }
    
    const products = await service.readModel1(userId, createdAt);
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Result tidak ditemukan" });
    }
    
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getResultModel2 = async (req, res) => {
  try {
    const { userId, createdAt } = req.query;
    
    if (!userId || !createdAt) {
      return res.status(400).json({ message: "userId dan createdAt diperlukan" });
    }
    
    const products = await service.readModel2(userId, createdAt);
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Result tidak ditemukan" });
    }
    
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addResultModel1,
  addResultModel2,
  getResultModel1,
  getResultModel2,
};
