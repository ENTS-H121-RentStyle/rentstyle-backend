import { validationResult } from "express-validator";
import { Follow } from "../models/follow_model";
import { FollowService } from "../services/follow_service";

const service = new FollowService();

const addFollow = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { follower_id, followed_id } = req.body;
  try {
    const duplicateFollow = await Follow.readOne(follower_id, followed_id);

    if (duplicateFollow) {
      return res.status(400).json({ message: "Pengguna sudah anda ikuti." });
    }

    const response = await service.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getOneFollow = async (req, res) => {
  try {
    const { followerId, followedId } = req.query;

    const response = await service.readOne(followerId, followedId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const filterFollow = async (req, res) => {
  const { followerId, followedId } = req.query;

  if (followerId && followedId) {
    return res.status(400).json({ message: "Salah input follow" });
  }

  try {
    let response="";
    if (followerId) {
      response = await service.readFollower(followerId);
    }

    if (followedId) {
      response = await service.readFollowed(followedId);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const dropFollow = async (req, res) => {
  try {
    const { id } = req.params; //size_id
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { addFollow, getOneFollow, filterFollow, dropFollow };
