import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/customer_controller.js";
import validateAddCustomer from "../middleware/validate_add_customer.js";

const router = Router();

router
  .post("/", tokenAuth, validateAddCustomer, Controller.addCustomer)
  .get("/:id", Controller.getDetailCustomer)
  .put("/:id", tokenAuth, validateAddCustomer, Controller.editCustomer)
  .delete("/:id", Controller.dropCustomer);

export default router;
