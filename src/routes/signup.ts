import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

// Errors
import { RequestValidationError } from "../errors/request-validation-error";

// Models
import { User } from "../models/user";
import { hashPassword } from "../functions/hashPassword";
import { AlreadyExistsError } from "../errors/user/already-exists-error";
import { createToken } from "../functions/createToken";

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
      .isLength({ min: 8, max: 64 })
      .matches(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)
      .withMessage(
        "Password must be between 8 and 64 characters, must contain 1 number, 1 uppercase and 1 lowercase letters, and 1 special character"
      ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { name, email, password } = req.body;

    // Check duplicate email
    const userWithEmail = await User.findOne({ where: { email: email } });
    if (userWithEmail !== null) {
      throw new AlreadyExistsError();
    }

    // Create id
    const userId = uuidv4();

    // Create token
    const token = createToken(userId, email);

    // Create user
    await User.create({
      name: name,
      email: email.toLowerCase(),
      hash: await hashPassword(password),
      userId: userId,
      token: token,
    });

    res.send({
      status: "success",
      data: {
        name: name,
        email: email,
        token: token,
      },
    });
  }
);

export { router as signupRouter };
