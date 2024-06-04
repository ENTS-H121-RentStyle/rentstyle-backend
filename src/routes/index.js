import { Router } from "express";
import productRouter from "./product_route.js";
import cartRouter from "./cart_route.js";
import userRouter from "./user_route.js";
import preferenceRouter from "./preference_route.js";
import sellerRouter from "./seller_route.js";
import FavoriteRouter from "./favorite_route.js";
import constantaRouter from "./constanta_route.js";
import sizeRouter from "./size_route.js";
import followRouter from "./size_route.js";
import orderRouter from "./order_route.js";

function routerApi(app) {
  const router = Router();
  app.use("/", router);
  router.use("/product", productRouter);
  router.use("/cart", cartRouter);
  router.use("/user", userRouter);
  router.use("/pref", preferenceRouter);
  router.use("/seller", sellerRouter);
  router.use("/favorite", FavoriteRouter);
  router.use("/const", constantaRouter);
  router.use("/size", sizeRouter);
  router.use("/follow", followRouter);
  router.use("/order", orderRouter)
}

export default routerApi;
