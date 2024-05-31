import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "sizes";

class Size extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "size",
      timestamps: false,
    };
  }
}

const SizeSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "size_id",
  },
  size: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  stocks: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  customer_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export { Size, SizeSchema };
