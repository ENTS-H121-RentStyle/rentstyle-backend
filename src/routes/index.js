import { Router } from "express"
import productRouter from "./product_route.js"
import cartRouter from "./cart_route.js"

function routerApi(app) {
  const router = Router()
  app.use("/", router)
  router.use("/product", productRouter)
  router.use('/cart', cartRouter)
}

export default routerApi
