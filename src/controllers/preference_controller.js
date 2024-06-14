import { Preference } from "../models/preference_model.js";
import { PreferenceService } from "../services/preference_service.js";
import { validationResult } from "express-validator";
const service = new PreferenceService();

const addPreference = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const categoryString = req.body.category.join(", ");
  const colorString = req.body.color.join(", "); 

  const transformRequest = await service.create({
    ...req.body,
    user_id: req.body.user_id,
    category: categoryString,
    color: colorString
  });

  try {
    const response = await service.create(transformRequest);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllPreference = async (req, res) => {
  try {
    const response = await service.readAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
};

const getPreferenceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editPreference = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const body = req.body;

  try {
    const userPref = await Preference.findByPk(id);
    if (!userPref) {
      return res
        .status(404)
        .json({ message: "User Preference tidak ditemukan." });
    }
    
    const response = await service.update(id, body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropPreference = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default {
  addPreference,
  getAllPreference,
  getPreferenceDetail,
  editPreference,
  dropPreference,
};
