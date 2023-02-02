import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Errors
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

// Models
import { User } from "../models/user";
import { hashPassword } from "../functions/hashPassword";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("name")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must be between 3 and 20 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { name, email, password } = req.body;

    try {
      await User.create({
        name: name,
        email: email,
        hash: await hashPassword(password),
      });
    } catch (err) {
      console.log(err);
      throw new DatabaseConnectionError();
    }

    res.send({
      status: "success",
      data: {
        name: name,
        email: email,
      },
    });
  }
);

export { router as signupRouter };
