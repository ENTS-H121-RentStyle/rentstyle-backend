import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/customer_controller.js";
import validateAddCustomer from "../middleware/validate_add_customer.js";
import validateEditCustomer from "../middleware/validate_edit_customer.js";

const router = Router();

router
  .post("/", tokenAuth, validateAddCustomer, Controller.addCustomer)
  .get("/:id", Controller.getDetailCustomer)
  .put("/:id", tokenAuth, validateEditCustomer, Controller.editCustomer)
  .delete("/:id", tokenAuth, Controller.dropCustomer);

export default router;
