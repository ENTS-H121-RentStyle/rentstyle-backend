import "../configs/database.js"
import { Cart } from "../models/cart_model.js"

class CartService{
    constructor(){}

    async create(data) {
        const res = await Cart.create(data)
        return res
      }
}

export { CartService }

