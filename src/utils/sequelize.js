import { Sequelize } from "sequelize";
import dbconfig from "../configs/database.js";

const sequelize = new Sequelize(
  dbconfig.dbName, // name database
  dbconfig.dbUser, // user database
  dbconfig.dbPassword, // password database
  {
    host: dbconfig.dbHost,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

sequelize.sync();

export default sequelize;
