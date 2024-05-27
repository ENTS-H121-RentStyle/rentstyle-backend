import { Router } from "express";
import tokenAuth from "../middleware/auth.js";
import Controller from "../controllers/customer_controller.js";

const router = Router();

router
  .post("/", Controller.addCustomer)
  .put("/:id", Controller.editCustomer)
  .delete("/:id", Controller.dropCustomer);

export default router;
