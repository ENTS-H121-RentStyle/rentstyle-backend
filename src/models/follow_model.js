import { Model, DataTypes } from "sequelize";

const TABLE_NAME = "follows";

class Follow extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Follow",
      timestamps: false,
    };
  }
}

const FollowSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "follow_id",
  },
  follower_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  followed_id: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

export { Follow, FollowSchema };
