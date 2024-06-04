import "../configs/database.js";
import crypto from "crypto";
import { Collection } from "../models/collection_model.js";

class CollectionService {
    constructor() {}
    
    async create(data) {
        const collectionId = crypto.randomUUID();
        const res = await Collection.create({ ...data, id: collectionId });
        return res;
    }

    async delete(id) {
        const model = await Collection.findByPk(id);
        await model.destroy();
        return { deleted: true };
    }
}

export { CollectionService };