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
  category: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.STRING
  },
  count_num_rating: {
    type: DataTypes.STRING
  },
  avg_rating: {
    type: DataTypes.STRING
  }
};

export { Preference, PreferenceSchema };
