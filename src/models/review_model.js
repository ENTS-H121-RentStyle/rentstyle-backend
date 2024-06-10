import { Model, DataTypes } from "sequelize"

const TABLE_NAME = "reviews"

class Review extends Model {
    static config(sequelize) {
        return {
        sequelize,
        tableName: TABLE_NAME,
        modelName: "Review",
        timestamps: false,
        }
    }
}

const ReviewSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        field: "review_id"
    },
    order_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    product_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    user_id: {
        allowNull: false,
        type: DataTypes.STRING
    },
    rating: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    review:  {
        allowNull: false,
        type: DataTypes.TEXT
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

export { Review, ReviewSchema }
