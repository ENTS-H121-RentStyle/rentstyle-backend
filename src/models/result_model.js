import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "results";

class Result extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE_NAME,
            modelName: "Result",
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: false,
        };
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
    recommendation: { 
        allowNull: false,
        type: DataTypes.TEXT,
    },
    model_type: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: { 
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'createdAt'
    },
};

export { Result, ResultSchema };