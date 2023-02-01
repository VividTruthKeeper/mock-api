import { Sequelize } from "sequelize-typescript";
import process from "process";

// Models
import { User } from "../models/user";

const db: string = "mockapi";

const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";

export const sequelize = new Sequelize({
  database: db,
  dialect: "postgres",
  username: username,
  password: password,
  storage: ":memory:",
});

sequelize.addModels([User]);
