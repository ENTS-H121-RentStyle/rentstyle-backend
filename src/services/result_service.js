import "../configs/database.js";
import crypto from "crypto";
import { Result } from "../models/result_model.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize"; 


class ResultService {
    constructor() {}

    async create(data, category) {
        const resultId = crypto.randomUUID();
        const res = await Result.create({ ...data, id: resultId, category });
        return res;
    }

    async readModel1(userId, createdAt) {
        const res = await Result.findOne({
            where: { 
                [Op.and]: [
                    { user_id: userId },
                    { createdAt: createdAt },
                    { model_type: "model1" },
                ],
            },
        });

        return res;

    }

    async readModel2(userId, createdAt) {
        const res = await Result.findOne({
            where: { 
                [Op.and]: [
                    { user_id: userId },
                    { createdAt: createdAt },
                    { model_type: "model2" },
                ],
            },
        });

        return res;

    }
}

export { ResultService };