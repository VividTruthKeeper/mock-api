import express from "express";
import { TokenRequiredError } from "../errors/user/token-required-error";
import { UserNotFound } from "../errors/user/user-not-found";
import { authVerify } from "../functions/auth-verify";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/currentUser", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new TokenRequiredError();
  }

  const decodedToken = await authVerify(token);
  const { userId } = decodedToken;

  const userByUserId = await User.findOne({ where: { userId: userId } });
  if (userByUserId) {
    res.status(200).send({
      status: "success",
      user: userByUserId.get(),
    });
  } else {
    throw new UserNotFound();
  }
});

export { router as currentUserRouter };
