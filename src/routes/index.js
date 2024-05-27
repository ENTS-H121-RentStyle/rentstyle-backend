import { Router } from "express";
import productRouter from "./product_route.js";
import cartRouter from "./cart_route.js";
import customerRouter from "./customer_route.js";
import preferenceRouter from "./preference_route.js";

function routerApi(app) {
  const router = Router();
  app.use("/", router);
  router.use("/product", productRouter);
  router.use("/cart", cartRouter);
  router.use("/customer", customerRouter);
  router.use("/pref", preferenceRouter);
}

export default routerApi;
