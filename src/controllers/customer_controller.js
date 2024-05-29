import { validationResult } from "express-validator";
import { CustomerService } from "../services/customer_service.js";
import { Customer } from "../models/customer_model.js";

const service = new CustomerService();

const addCustomer = async (req, res) => {
  
  const errors = validationResult(req)
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

const getDetailCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const { id } = req.params;
  const body = req.body;

  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({message: "Customer tidak ditemukan" });
    }

    const response = await service.update(id, body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dropCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addCustomer, getDetailCustomer, editCustomer, dropCustomer };
