import { ExploreService } from '../services/explore_service.js';

const service = new ExploreService();

const getAllExplore = async (req, res) => {
    try {
        const response = await service.readAll1();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default { getAllExplore };
