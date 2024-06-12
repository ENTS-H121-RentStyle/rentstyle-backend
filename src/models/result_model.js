import { Model, DataTypes } from "sequelize"

const TABLE_NAME = "results"

class Result extends Model {
    static config(sequelize) {
        return {
        sequelize,
        tableName: TABLE_NAME,
        modelName: "Result",
        timestamps: true,
        }
    }
}

const ResultSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        field: "result_id"
    },
    user_id: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    recomendation: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    model_type: {
        allowNull: false,
        type: DataTypes.STRING,
    },
}

export { Result, ResultSchema }

    