import { Model, DataTypes } from "sequelize";
import { Customer } from "./customer_model.js"

const TABLE_NAME = "carts";

class Cart extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Cart",
      timestamps: false,
    };
  }
}

const CartSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "cart_id",
  },
  product_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  customer_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export { Cart, CartSchema };
