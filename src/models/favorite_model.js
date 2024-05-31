import { Model, DataTypes } from "sequelize";
import { Customer } from "./user_model.js"

const  TABLE_NAME = "favorites";

class Favorite extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: "Favorite",
            timestamps: false,
        };
    };
};

const FavoriteSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        field: "favorite_id"
    },
    product_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    customer_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
};

export { 
    Favorite,
    FavoriteSchema
}