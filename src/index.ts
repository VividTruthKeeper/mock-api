import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { json } from "body-parser";

// Routes
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

// Middlewares
import { errorHandler } from "./middlewares/error-handler";

// Errors
import { NotFoundError } from "./errors/not-found-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";

// DB
import { sequelize } from "./instances/sequelize";
import { initDatabase } from "./functions/initDatabase";

const app = express();

app.use(json());
app.use(cors());

const start = async (): Promise<void> => {
  app.use(currentUserRouter);
  app.use(signinRouter);
  app.use(signoutRouter);
  app.use(signupRouter);

  try {
    await sequelize.authenticate();
  } catch (err) {
    console.log(err);
    initDatabase(process.env.DB_NAME || "");
  }

  try {
    await sequelize.sync();
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }

  app.all("*", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

void start();
