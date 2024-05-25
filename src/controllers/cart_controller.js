import { CartService } from "../services/cart_service.js";
const service = new CartService()

const create = async (req, res) => {
    try {
      const response = await service.create(req.body)
      res.json({ success: true, data: response })
    } catch (error) {
      res.status(500).send({ success: false, message: error.message })
    }
  }

export default {create}