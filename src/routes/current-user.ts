import express from "express";
import { TokenInvalidError } from "../errors/user/token-invalid-error";
import { UserNotFound } from "../errors/user/user-not-found";
import { authVerify } from "../middlewares/auth-verify";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/currentUser", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new TokenInvalidError();
  }

  const { userId } = await authVerify(token);

  const userByUserId = await User.findOne({ where: { userId: userId } });

  if (userByUserId) {
    res.status(200).send({
      status: "success",
      data: userByUserId.get(),
    });
  } else {
    throw new UserNotFound();
  }
});

export { router as currentUserRouter };
