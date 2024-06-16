import { validationResult } from "express-validator";
import { OrderService } from "../services/order_services.js";
import { Order } from "../models/order_model.js";
import { Product } from "../models/product_model.js";

const service = new OrderService();

const addOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { product_id } = req.body;
  const { service_fee } = req.body;
  const { rent_price } = req.body;
  const { deposit } = req.body;
  const { total_payment } = req.body;
  const { rent_duration } = req.body;
  const existingProduct = await Product.findOne({
    where: { id: product_id },
    attributes: ["rent_price"],
  });
  const serviceFee = existingProduct.rent_price * 0.5;
  if (Math.abs(service_fee - serviceFee) > Number.EPSILON) {
    return res.status(400).json({ message: "Service Fee tidak sah." });
  }

  const rentPrice = existingProduct.rent_price * rent_duration;
  if (Math.abs(rent_price - rentPrice) > Number.EPSILON) {
    return res.status(400).json({ message: "Rent Price tidak sah." });
  }

  const existingProductPrice = await Product.findOne({
    where: { id: product_id },
    attributes: ["product_price"],
  });
  if (!existingProductPrice) {
    return res.status(404).json({ message: "Produk tidak ditemukan." });
  }
  const productPrice = existingProductPrice.product_price;
  let const_deposit;
  if (productPrice <= 500000) {
    const_deposit = 0.25;
  } else if (productPrice <= 1000000) {
    const_deposit = 0.2;
  } else if (productPrice <= 5000000) {
    const_deposit = 0.15;
  } else {
    const_deposit = 0.1;
  }
  const deposito = productPrice * const_deposit;
  if (Math.abs(deposit - deposito) > Number.EPSILON) {
    return res.status(400).json({ message: "Deposit Fee tidak sah." });
  }

  const totalPayment = rent_price + service_fee + deposit;
  if (Math.abs(total_payment - totalPayment) > Number.EPSILON) {
    return res.status(400).json({ message: "Total Payment tidak sah." });
  }

  try {
    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const response = await service.readAll();
    res.status(200).json(response);
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

export default {
  addOrder,
  getAllOrder,
  getDetailOrder,
  getFilter,
  editOrder,
  dropOrder,
};
