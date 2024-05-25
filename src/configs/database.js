import {config} from 'dotenv'

config()

const dbconfig = {
  dbUser: process.env.MYSQL_USER,
  dbPassword: process.env.MYSQL_PASSWORD,
  dbHost: process.env.MYSQL_HOST,
  dbName: process.env.MYSQL_DATABASE,
}

export default dbconfig