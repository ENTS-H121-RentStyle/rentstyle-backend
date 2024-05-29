import { FavoriteService } from "../services/favorite_service.js";
const service = new FavoriteService()

const addFavorite = async(req, res) => {
    try {
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
        const { q } = req.query;
        const response = await service.readSearch(q);
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
