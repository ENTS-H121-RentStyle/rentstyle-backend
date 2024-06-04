import { validationResult } from "express-validator";
import { UserService } from "../services/user_service.js";
import { User } from "../models/user_model.js";
import { uploadFileToGCS, deleteFileFromGCS } from "../services/image_service.js";

const service = new UserService();

const addUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
      let imageUrl = null;
      if (req.file) {
        imageUrl = await uploadFileToGCS(req.file, "user");
      }
  
      const userData = {
        ...req.body,
        image: imageUrl, // Menambahkan URL gambar ke data produk
      };

    const response = await service.create(userData);
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
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const body = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    let imageUrl = user.image;
    if (req.file) {
      if (user.image) {
        await deleteFileFromGCS(user.image);
      }
      imageUrl = await uploadFileToGCS(req.file, "user");
    }

    const updatedUserData = {
      ...body,
      image: imageUrl,
    };

    const response = await service.update(id, updatedUserData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const dropUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    // Hapus gambar dari Cloud Storage jika ada
    if (user.image) {
        await deleteFileFromGCS(user.image);
    }

    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addUser, findDetailUser, editUser, dropUser };
