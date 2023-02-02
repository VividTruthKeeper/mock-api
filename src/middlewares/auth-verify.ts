import jwt from "jsonwebtoken";
import { TokenInvalidError } from "../errors/user/token-invalid-error";

export const authVerify = (token: string) => {
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY || "");
  if (!(decodedToken instanceof Object)) {
    throw new TokenInvalidError();
  }
  if (!("user_id" in decodedToken)) {
    throw new TokenInvalidError('Token is missing a required field "userId"');
  }
  return decodedToken;
};
