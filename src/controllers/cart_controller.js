import { CartService } from "../services/cart_service.js";
const service = new CartService()

const addCart = async (req, res) => {
    try {
      const response = await service.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  const findUserCart = async (req, res) => {
    try {
      const { id } = req.params //customer_id
      const response = await service.readFilter(id);

      const sanitizedResponse = response.map(item => {
        const { product_id, ...rest } = item.toJSON();
        return rest;
      });
      res.status(200).json(sanitizedResponse);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  const editCart = async (req, res) => {
    try {
      const { id } = req.params //cart_id
      const body = req.body
      const response = await service.update(id, body)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
  
  const dropCart = async (req, res) => {
    try {
      const { id } = req.params //cart_id
      const response = await service.delete(id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

export default {addCart, findUserCart, editCart, dropCart}