import { Preference } from "../models/preferensi_model.js";
import { PreferenceService } from "../services/preference_service.js";
import { validationResult } from "express-validator";
const service = new PreferenceService();

const addPreference = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const response = await service.create(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getAllPreference = async (req, res) => {
  try {
    const response = await service.readAll();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getPreferenceDetail = async (req, res) => {
  try {
    const response = await service.readOne();
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
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
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const dropPreference = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export default {
  addPreference,
  getAllPreference,
  getPreferenceDetail,
  editPreference,
  dropPreference,
};
