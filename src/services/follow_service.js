import "../configs/database.js";
import crypto from "crypto";
import { Follow } from "../models/follow_model.js";

class FollowService {
  constructor() {}

  async create(data) {
    const followId = crypto.randomUUID();
    const res = await Follow.create({ ...data, id: followId });
    return res;
  }

  async readOne(followerId, followedId) {
    const res = await Follow.findOne({
      where: {
        [Op.and]: [
          {
            follower_id: followerId,
          },
          {
            followed_id: followedId,
          },
        ],
      },
    });
    return res;
  }

  async readFollower(userId) {
    const res = await Follow.findAll({
      where: { follower_id: userId },
    });
    return res;
  }

  async readFollowed(userId) {
    const res = await Follow.findAll({
      where: { followed_id: userId },
    });

    return res;
  }

  async delete(id) {
    const model = await Follow.findByPk(id);
    await model.destroy();
    return { deleted: true };
  }
}

export { FollowService };
