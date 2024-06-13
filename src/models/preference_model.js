import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "preferences";

class Preference extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Preferences",
      timestamps: false,
    };
  }
}

const PreferenceSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "pref_id",
  },
  user_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.STRING,
  },
};

export { Preference, PreferenceSchema };
