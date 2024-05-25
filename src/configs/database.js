import {config} from 'dotenv'
import { Sequelize } from "sequelize";
import setupModels from '../models/index.js';

config()

const database = new Sequelize(
  process.env.MYSQL_DATABASE, // name database
  process.env.MYSQL_USER, // user database
  process.env.MYSQL_PASSWORD, // password database
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

// database
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });
database.sync();

setupModels(database)

export default database;
