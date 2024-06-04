import { validationResult } from "express-validator";
import { OrderService } from "../services/order_services.js";

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
  try {
    const { key } = req.query
    const response = await service.readFilter(key)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getDetailOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne(id);
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

export default { addOrder, getDetailOrder, getFilter, dropOrder };
