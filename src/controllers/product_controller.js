import { ProductService } from "../services/product_service.js";
import { validationResult } from "express-validator";
import { Product } from "../models/product_model.js";
import { uploadFileToGCS, deleteFileFromGCS, } from "../services/image_service.js";
import dotenv from "dotenv";

dotenv.config();

const service = new ProductService();
const DEFAULT_IMAGE_PRODUCT = process.env.DEFAULT_IMAGE_PRODUCT;


const addProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let imageUrl = DEFAULT_IMAGE_PRODUCT;
    if (req.file) {
      imageUrl = await uploadFileToGCS(req.file, "product");
    }

    const productData = {
      ...req.body,
      image: imageUrl,
    };

    const response = await service.create(productData);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Middleware untuk semua route lainnya
const getSearch = async (req, res) => {
  try {
    const { q } = req.query;
    const { category } = req.query;
    const response = await service.readSearch(q, category);

    if (!response || (Array.isArray(response) && response.length === 0)) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const response = await service.readAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFilter = async (req, res) => {
  try {
    let response;
    const { key } = req.query;
    response =(
      key == "Terbaru"
        ? await service.findLatest()
        : key == "Termahal"
        ? await service.findMostExpensive()
        : key == "Termurah"
        ? await service.findCheapest()
        : key == "Terpopuler"
        ? await service.sortByMostOrders()
        : key == "Tertinggi"
        ? await service.sortByHighestRating()
        : await service.readFilter(key));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const body = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    let imageUrl = product.image;
    if (req.file) {
      if (product.image) {
        await deleteFileFromGCS(product.image);
      }
      imageUrl = await uploadFileToGCS(req.file, "product");
    }

    const updatedProductData = {
      ...body,
      image: imageUrl, // Updating image URL
    };

    const response = await service.update(id, updatedProductData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // Hapus gambar dari Cloud Storage jika ada
    if (product.image) {
      await deleteFileFromGCS(product.image);
    }

    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default {
  addProduct,
  getSearch,
  getAllProduct,
  getFilter,
  getDetailProduct,
  editProduct,
  dropProduct,
};
