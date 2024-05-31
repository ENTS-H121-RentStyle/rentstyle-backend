import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { SizeService } from "../services/size_service.js";
import { Size } from "../models/size_model.js";
const service = new SizeService();

const addSize = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { product_id, size } = req.body;
  try {
    const duplicateSize = await Size.findOne({
      where: {
        [Op.and]: [
          {
            product_id: product_id,
          },
          {
            size: size,
          },
        ],
      },
    });

    if (duplicateSize) {
      return res.status(400).json({ message: "Size tidak boleh duplikat." });
    }

    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getOneSize = async (req, res) => {
  try {
    const { id } = req.params
    const response = await service.readOne(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const findProductSize = async (req, res) => {
  try {
    const { id } = req.params; //product_id
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

const editSize = async (req, res) => {
  try {
    const { id } = req.params; //size_id
    const body = req.body;
    const response = await service.update(id, body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropSize = async (req, res) => {
  try {
    const { id } = req.params; //size_id
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addSize, findProductSize, getOneSize, dropSize };
