import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "seller";

class Seller extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Seller",
      timestamps: false,
    };
  };
};

const SellerSchema = {
    id: {
        allowNull: false, 
        primaryKey: true,
        type: DataTypes.STRING,
        field: "seller_id"
    },
    seller_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    // email: {
    //     type: DataTypes.STRING
    // },
    address: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type:DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.STRING
    }
};

export { Seller, SellerSchema };
