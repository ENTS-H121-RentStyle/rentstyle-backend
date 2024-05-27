import { ProductService } from "../services/product_service.js";

const service = new ProductService();

const addProduct = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const response = await service.find()
    res.json(response)
  } catch (error) {
    res.status(500).send({ success: false, message: error.message })
  }
}

const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params
    const response = await service.findOne(id)
    res.json(response)
  } catch (error) {
    res.status(500).send({ success: false, message: error.message })
  }
}

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.update(id, body);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const dropProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

export default { addProduct, editProduct, dropProduct, getAllProduct, getDetailProduct}