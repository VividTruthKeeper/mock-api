import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { comparePassword } from "../functions/comparePassword";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { createToken } from "../functions/createToken";

const router = express.Router();

router.post(
  "/api/users/signIn",
  [body("email").isEmail().withMessage("Invalid email")],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    let passwordCorrect: boolean = false;
    let result;
    const sanitizedEmail = email.toLowerCase();
    const userByEmail = await User.findOne({
      where: { email: sanitizedEmail },
    });
    if (userByEmail) {
      result = await userByEmail.get();
      passwordCorrect = await comparePassword(password, result.hash);
    }

    if (passwordCorrect) {
      console.log(userByEmail?.token);
      userByEmail?.update({ token: createToken(result.userId, result.email) });

      res.status(200).send({
        status: "success",
        user: result,
      });
    } else {
      res.status(401).send({
        status: "failed",
        message: "Incorrect password",
      });
    }
  }
);

export { router as signinRouter };
