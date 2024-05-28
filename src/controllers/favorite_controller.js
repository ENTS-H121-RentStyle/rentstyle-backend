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

export default { 
    addFavorite
};
