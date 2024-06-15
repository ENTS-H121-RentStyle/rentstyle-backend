import { ProductService } from "../services/product_service.js";
import { validationResult } from "express-validator";
import { Product } from "../models/product_model.js";
import {
  uploadFileToGCS,
  deleteFileFromGCS,
} from "../services/image_service.js";
import dotenv from "dotenv";
import { paginateResults, calculateTotalPages } from "../utils/pagination.js";

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

const getSearch = async (req, res) => {
  try {
    const { q, category, page=1, limit=10 } = req.query;
    const searchProduct = await service.readSearch(q, category);
    const totalCount = searchProduct.length;
    const paginatedProducts = paginateResults(filteredProduct, page, limit);

    if (!paginatedProducts || paginatedProducts.length === 0) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    const totalPages = calculateTotalPages(totalCount, limit);
    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount,
      products: paginatedProducts,
    };
    return res.status(200).json(response)
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
    let filteredProduct;
    const { key, page = 1, limit = 10 } = req.query;
    filteredProduct =
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
        : await service.readFilter(key);

    const totalCount = filteredProduct.length;
    const paginatedProducts = paginateResults(filteredProduct, page, limit);

    if (!paginatedProducts || paginatedProducts.length === 0) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    const totalPages = calculateTotalPages(totalCount, limit);
    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount,
      products: paginatedProducts,
    };
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
