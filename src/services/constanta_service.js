import "../configs/database.js";
import crypto from "crypto";
import { Constanta } from "../models/constanta_model.js";

class ConstantaService {
  constructor() {}

  async readOne(prefId) {
    const res = await Constanta.findByPk(prefId);
    return res;
  }
}

export { ConstantaService };
