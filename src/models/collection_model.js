import {Model, DataTypes, col} from "sequelize"

const TABLE_NAME = "collections"

class Collection extends Model {
    static config(sequelize) {
        return {
        sequelize,
        tableName: TABLE_NAME,
        modelName: "Collection",
        timestamps: false,
        }
    }
}

const CollectionSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        field: "collection_id"
    },
    seller_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    collection_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
};

export { Collection, CollectionSchema }