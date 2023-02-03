import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { authVerify } from "../functions/auth-verify";
import { TokenInvalidError } from "../errors/user/token-invalid-error";
import { UserNotFound } from "../errors/user/user-not-found";

const router = express.Router();

router.put(
  "/api/users/updateUser",
  [
    body("name")
      .isLength({ min: 3, max: 20 })
      .withMessage("Name must be between 3 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { token } = req.query;

    if (!token) {
      throw new TokenInvalidError();
    }

    const decodedToken = await authVerify(token);
    const { userId } = decodedToken;

    const userByUserId = await User.findOne({ where: { userId: userId } });
    if (userByUserId) {
      const { name } = req.body;
      const updatedUser = await userByUserId?.update({ name: name });

      res.status(200).send({
        status: "success",
        user: await updatedUser.get(),
      });
    } else {
      throw new UserNotFound();
    }
  }
);

export { router as updateUserRouter };
