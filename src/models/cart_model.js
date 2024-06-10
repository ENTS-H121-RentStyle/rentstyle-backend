import { Model, DataTypes } from "sequelize";

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
  user_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  duration: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
};

export { Cart, CartSchema };
