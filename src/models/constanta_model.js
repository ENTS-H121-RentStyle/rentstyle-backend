import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "consts";

class Constanta extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Constanta",
      timestamps: false,
    };
  }
}

const ConstSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "const_id",
  },
  key: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  value: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
};

export { Constanta, ConstSchema };
