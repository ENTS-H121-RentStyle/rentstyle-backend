import { validationResult } from "express-validator";
import { FavoriteService } from "../services/favorite_service.js";
import { Favorite } from "../models/favorite_model.js";
import { Op } from "sequelize";

const service = new FavoriteService()

const addFavorite = async(req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { customer_id, product_id } = req.body;

    try {
        const existingFavorite = await Favorite.findOne({
            where: {
                [Op.and]: [
                    {
                        customer_id: customer_id,
                    },
                    {
                        product_id: product_id,
                    },
                ],
            },
        });

        if (existingFavorite) {
            return res.status(400).json({ message: "Product sudah ada di dalam Favorite" });
        };

        
        const response = await service.create(req.body);
        res.status(201).json(response);
    } catch(error) {
        res.status(500).send({ message: error.message });
    };
};

const getAllFavorite = async(req, res) => {
    try {
        const response = await service.readAll();
        res.status(200).json(response);
    } catch(error) {
        res.status(500).send({ message: error.message });
    };
};

const getSearchFavorite = async(req, res) => {
    try {
        const { userId, q } = req.query;
        const response = await service.readSearch(userId, q);
        res.status(200).json(response);
    } catch(error) {
        res.status(500).send({ message: error.message });
    };
};

const findUserFavorite = async(req, res) => {
    try{
        const { id } = req.params
        const response = await service.readFilter(id);

        const sanitizedResponse = response.map(item => {
            const { product_id, ...rest } = item.toJSON();
            return rest;
        });

        res.status(200).json(sanitizedResponse);
    } catch(error) {
        res.status(500).send({ message: error.message });
    };
};

const dropFavorite = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.status(200).json(response);
    } catch(error) {
        res.status(500).send({ message: error.message });
    };
};


export default { 
    addFavorite,
    getAllFavorite,
    getSearchFavorite,
    findUserFavorite,
    dropFavorite
};
