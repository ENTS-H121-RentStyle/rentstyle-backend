import {Model, DataTypes, col} from "sequelize"

const TABLE_NAME = "histories"

class History extends Model {
    static config(sequelize) {
        return {
        sequelize,
        tableName: TABLE_NAME,
        modelName: "History",
        timestamps: false,
        }
    }
}

const HistorySchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        field: "history_id"
    },
    order_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING
    },
};

export { History, HistorySchema }