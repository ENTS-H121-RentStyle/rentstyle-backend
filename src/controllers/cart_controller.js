import { validationResult } from "express-validator";
import { CartService } from "../services/cart_service.js";
import { Cart } from "../models/cart_model.js";
import { Op } from "sequelize";
import { Size } from "../models/size_model.js";
const service = new CartService();

const addCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, product_id, size_id } = req.body;
  try {
    const findSize = await Size.findOne({
      where: {
        [Op.and]: [
          {
            product_id: product_id,
          },
          {
            size_id: size_id
          }
        ],
      },
    });

    if (!findSize) {
      return res.status(400).json({ message: "Masukan Size yang benar" });
    }

    const existingCart = await Cart.findOne({
      where: {
        [Op.and]: [
          {
            user_id: user_id,
          },
          {
            product_id: product_id,
          },
          {
            size_id: size_id
          }
        ],
      },
    });

    if (existingCart) {
      return res
        .status(400)
        .json({ message: "Product sudah ada di dalam Cart" });
    }

    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findUserCart = async (req, res) => {
  try {
    const { id } = req.params; //user_id
    const response = await service.readFilter(id);

    const sanitizedResponse = response.map((item) => {
      const { product_id, ...rest } = item.toJSON();
      return rest;
    });
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editCart = async (req, res) => {
  try {
    const { id } = req.params; //cart_id
    const body = req.body;
    const response = await service.update(id, body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropCart = async (req, res) => {
  try {
    const { id } = req.params; //cart_id
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addCart, findUserCart, editCart, dropCart };
