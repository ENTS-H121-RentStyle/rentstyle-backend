import { Router } from "express";
import productRouter from "./product_route.js";
import cartRouter from "./cart_route.js";
import userRouter from "./user_route.js";
import preferenceRouter from "./preference_route.js";
import sellerRouter from "./seller_route.js";
import FavoriteRouter from "./favorite_route.js";
import ConstantaRouter from "./constanta_route.js";
import SizeRouter from "./size_route.js";
import CollectionRouter from "./collection_route.js";


function routerApi(app) {
  const router = Router();
  app.use("/", router);
  router.use("/product", productRouter);
  router.use("/cart", cartRouter);
  router.use("/user", userRouter);
  router.use("/pref", preferenceRouter);
  router.use("/seller", sellerRouter);
  router.use("/favorite", FavoriteRouter);
  router.use("/const", ConstantaRouter);
  router.use("/size", SizeRouter);
  router.use("/collection", CollectionRouter);
}

export default routerApi;
