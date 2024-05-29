import { SellerService } from "../services/seller_service.js";

const service = new SellerService();

const addSeller = async(req, res) => {
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
    try {
        const { id } = req.params;
        const body = req.body;
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