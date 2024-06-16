import { ResultService } from "../services/result_service.js";
import { validationResult } from "express-validator";
import { paginateResults, calculateTotalPages } from "../utils/pagination.js";
import { getLastSunday } from "../utils/sunday.js";
import { Order } from "../models/order_model.js";

const service = new ResultService();

const addResultModel1 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, recommendation, ...otherFields } = req.body;

  if (!user_id || !recommendation) {
    return res
      .status(400)
      .json({ message: "user_id and recommendation are required" });
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
    return res
      .status(400)
      .json({ message: "user_id and recommendation are required" });
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

const getResultModel = async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;

    let createdAt = getLastSunday();
    if (!userId) {
      return res.status(400).json({ message: "userId diperlukan" });
    }

    const orderCount = await Order.findAll({ where: { user_id: userId } });
    const modelType=orderCount.length >= 10? "model2" : "model1"

    const allProducts = await service.readModel(userId, createdAt, modelType);
    const totalCount = allProducts.length;
    const paginatedProducts = paginateResults(allProducts, page, limit);

    if (!paginatedProducts || paginatedProducts.length === 0) {
      return res.status(404).json({ message: "Result tidak ditemukan" });
    }

    const totalPages = calculateTotalPages(totalCount, limit);

    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount,
      products: paginatedProducts,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addResultModel1,
  addResultModel2,
  getResultModel,
};
