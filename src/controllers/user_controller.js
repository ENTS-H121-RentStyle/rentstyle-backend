import { validationResult } from "express-validator";
import { UserService } from "../services/user_service";
import { User } from "../models/user_model";

const service = new UserService();

const addUser = async (req, res) => {
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

const findDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const { id } = req.params;
  const body = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({message: "User tidak ditemukan" });
    }

    const response = await service.update(id, body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dropUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addUser, findDetailUser, editUser, dropUser };
