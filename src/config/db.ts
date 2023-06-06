import { Sequelize } from "sequelize-typescript";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize({
  database: dbName,
  dialect: "mysql",
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
  models: [__dirname + "/../models"],
});

export default sequelizeConnection;
