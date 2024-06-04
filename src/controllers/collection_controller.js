import { validationResult } from "express-validator";
import { CollectionService } from "../services/collection_service.js";
import { Collection } from "../models/collection_model.js";
import { Op } from "sequelize";


const service = new CollectionService();

const addCollection = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        const { collection_name, seller_id } = req.body;

        const existingCollection = await Collection.findOne({ 
            where: { 
                [Op.and]: [
                    { 
                        collection_name: collection_name 
                    },
                    {
                        seller_id: seller_id 
                    }
                ]
            },
        });

        if (existingCollection) {
            return res.status(400).json({ message: "Nama Collection sudah ada!" });
        }

        const response = await service.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const dropCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.status(200).json(response);
    }   catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default {
    addCollection,
    dropCollection,
}