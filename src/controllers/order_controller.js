import { validationResult } from "express-validator";
import { OrderService } from "../services/order_services.js";
import { Order } from "../models/order_model.js";

const service = new OrderService();

const addOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFilter = async (req, res) => {
  const { userId } = req.query;
  const { status } = req.query;
  try {
    const response = await service.readFilter(userId, status);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getDetailOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { order_status } = req.body;

  try {
    const orderExist = await Order.findByPk(id);
    if (!orderExist) {
      return res.status(404).json({ message: "Order tidak ditemukan." });
    }

    const response = await service.update(id, { order_status });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addOrder, getDetailOrder, getFilter, editOrder, dropOrder };
