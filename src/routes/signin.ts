import express from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { comparePassword } from "../functions/comparePassword";
import { User } from "../models/user";

const router = express.Router();

router.post("/api/users/signin", async (req, res) => {
  const { email, password } = req.body;
  let passwordCorrect: boolean = false;
  try {
    const userByEmail = await User.findOne({ where: { email: email } });
    if (userByEmail) {
      const result = await userByEmail.get();
      passwordCorrect = await comparePassword(password, result.hash);
    }
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }

  console.log(passwordCorrect);

  if (passwordCorrect) {
    res.send({
      status: "success",
      message: "Signed in successfuly",
    });
  } else {
    res.send({
      status: "failed",
      message: "Incorrect password",
    });
  }
});

export { router as signinRouter };
