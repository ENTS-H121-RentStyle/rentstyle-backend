import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "orders";

class Order extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Order",
      timestamps: false,
    };
  }
}

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "order_id",
  },
  product_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  order_status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "Belum Bayar",
  },
  order_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  return_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  service_fee: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  rent_price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  deposit: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  total_payment: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  note: {
    type: DataTypes.TEXT,
  },
};

export { Order, OrderSchema };
