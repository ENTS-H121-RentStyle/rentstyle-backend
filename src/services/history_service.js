import "../configs/database.js";
import crypto from "crypto";

class HistoryService {
    constructor() {}
    
    async create(data) {
        const collectionId = crypto.randomUUID();
        const res = await History.create({ ...data, id: collectionId });
        return res;
    }

    async delete(id) {
        const model = await History.findByPk(id);
        await model.destroy();
        return { deleted: true };
    }
}

export { HistoryService };