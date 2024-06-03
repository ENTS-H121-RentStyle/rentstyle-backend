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
    const duplicateFollow = await Follow.readOne(follower_id, followed_id)

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
    const { follower_id, followed_id } = req.body;

    const response = await service.readOne(follower_id, followed_id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const filterFollower = async (req, res) => {
    try {
      const { userId } = req.params; //Followed_id
      const response = await service.readFollower(userId);
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

const filterFollowed = async (req, res) => {
    try {
      const { userId } = req.params; //Followed_id
      const response = await service.readFollowed(userId);
  
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

export default { addFollow, getOneFollow, filterFollowed, filterFollower, dropFollow };
