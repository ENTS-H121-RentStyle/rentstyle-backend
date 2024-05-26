import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "customers";

class Customer extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Customer",
      timestamps: false,
    };
  }
}

const CustomerSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "customer_id",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  color_pref: {
    type: DataTypes.STRING
  },
  size_pref: {
    type: DataTypes.STRING
  },
  count_num_rating: {
    type: DataTypes.INTEGER
  },
  avg_rating: {
    type: DataTypes.FLOAT
  }
};

export { Customer, CustomerSchema };
