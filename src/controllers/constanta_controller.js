import { ConstantaService } from "../services/constanta_service.js";
const service = new ConstantaService();

const getConstanta = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.readOne(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { getConstanta };
