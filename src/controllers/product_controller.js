import { ProductService } from "../services/product_service.js";

const service = new ProductService();

const addProduct = async (req, res) => {
  try {
    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getSearch = async (req, res) => {
  try {
    const { q } = req.query
    const response = await service.readSearch(q)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getAllProduct = async (req, res) => {
  try {
    const response = await service.readAll()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getFilter = async (req, res) => {
  try {
    const { key } = req.query
    const response = await service.readFilter(key)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params
    const response = await service.readOne(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await service.update(id, body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addProduct, getSearch, getAllProduct, getFilter, getDetailProduct, editProduct, dropProduct}