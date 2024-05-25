import sequelize from "../utils/sequelize.js";

const getProduct = async (req, res) => {
    try {
      const [results, metadata] = await sequelize.query('SELECT 1 + 1 AS solution');
      res.send(`The solution is: ${results[0].solution}`);
    } catch (error) {
      res.status(500).send('Error querying the database');
    }
  }

export default {getProduct}