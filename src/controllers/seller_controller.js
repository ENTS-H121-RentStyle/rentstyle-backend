import { SellerService } from "../services/seller_service.js";
import { validationResult } from "express-validator";
import { Seller } from "../models/seller_model.js"; 


const service = new SellerService();

const addSeller = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };


    try {
        const response = await service.create(req.body);
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

const editSeller = async(req, res) => {

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
        
        const response = await service.update(id, body);
        res.status(200).json(response);
    }catch(error) {
        res.status(500).send({ message: error.message });
    };
};

const dropSeller = async(req, res) => {
    try {
        const { id } = req.params;
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