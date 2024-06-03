import { SellerService } from "../services/seller_service.js";
import { validationResult } from "express-validator";
import { Seller } from "../models/seller_model.js"; 
import { Op } from "sequelize";
import { User } from "../models/user_model.js";
import { uploadFileToGCS, deleteFileFromGCS } from "../services/image_service.js";

const service = new SellerService();

const addSeller = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { user_id, email } = req.body;


    try {

        let imageUrl = null;
        if (req.file) {
          imageUrl = await uploadFileToGCS(req.file, "seller");
        }

        const sellerData = {
        ...req.body,
        image: imageUrl, // Menambahkan URL gambar ke data produk
        };

        const existingUser = await User.findOne({
            where: {
                [Op.and]: [
                    { 
                        user_id: user_id,
                    },
                    {
                        email: email, 
                    },
                ],
            },
        });

        if (!existingUser) {
            return res.status(400).json({ message: "User tidak ditemukan." });
        };  

    

        const response = await service.create(sellerData);
        res.status(201).json(response);
        } catch(error) {
            res.status(500).send({ message: error.message });
    };
};

const getDetailSeller = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await service.readOne(id);
        res.status(200).json(response);
    } catch(error) {
        res.status(500).send({ message: error.message });
    }
}

const editSeller = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
  
    const { id } = req.params;
    const body = req.body;
  
    try {
      const seller = await Seller.findByPk(id);
      if (!seller) {
        return res.status(404).json({ message: "Seller tidak ditemukan." });
      };
  
      let imageUrl = seller.image; 
      if (req.file) {
        if (seller.image) {
          await deleteFileFromGCS(seller.image);
        }
        imageUrl = await uploadFileToGCS(req.file, "seller");
      }
  
      const updatedSellerData = {
        ...body,
        image: imageUrl, 
      };
  
      const response = await service.update(id, updatedSellerData);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send({ message: error.message });
    };
  };

const dropSeller = async(req, res) => {
    try {
        const { id } = req.params;
        
        const seller = await Seller.findByPk(id);

        if (!seller) {
          return res.status(404).json({ message: "Seller tidak ditemukan." });
        }

        // Hapus gambar dari Cloud Storage jika ada
        if (seller.image) {
            await deleteFileFromGCS(seller.image);
        }

        const response = await service.delete(id);
        res.status(200).json(response);
    } catch(error) {
        res.status(500).send({ message: error.message });
    };
};

export default {
    addSeller,
    getDetailSeller,
    editSeller,
    dropSeller
}