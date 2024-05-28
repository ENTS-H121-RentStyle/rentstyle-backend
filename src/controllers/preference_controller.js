import { PreferenceService } from "../services/preference_service.js";

const service = new PreferenceService();

const addPreference = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getAllPreference = async (req, res) => {
  try {
    const response = await service.readAll()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getPreferenceDetail = async (req, res) => {
  try {
    const response = await service.readOne()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const editPreference= async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
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

export default { addPreference, getAllPreference, getPreferenceDetail, editPreference, dropPreference}