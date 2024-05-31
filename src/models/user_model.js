import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "users";

class User extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "User",
      timestamps: false,
    };
  }
}

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "user_id",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  birth_date: {
    type: DataTypes.DATE
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  }
};

export { User, UserSchema };
