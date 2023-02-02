import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { comparePassword } from "../functions/comparePassword";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [body("email").isEmail().withMessage("Invalid email")],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    let passwordCorrect: boolean = false;
    const sanitizedEmail = email.toLowerCase();
    const userByEmail = await User.findOne({
      where: { email: sanitizedEmail },
    });
    if (userByEmail) {
      const result = await userByEmail.get();
      passwordCorrect = await comparePassword(password, result.hash);
    }

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
  }
);

export { router as signinRouter };
