import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/customer_controller.js";
import validateCustomer from "../middleware/validateCustomer.js";

const router = Router();

router
  .post("/", tokenAuth, validateCustomer, Controller.addCustomer)
  .get("/:id", Controller.getDetailCustomer)
  .put("/:id", tokenAuth, validateCustomer, Controller.editCustomer)
  .delete("/:id", Controller.dropCustomer);

export default router;
