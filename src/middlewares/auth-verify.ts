import jwt from "jsonwebtoken";
import { TokenInvalidError } from "../errors/user/token-invalid-error";

interface IdecodedTokenType {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export const authVerify = async (token: any): Promise<IdecodedTokenType> => {
  const decodedToken = await jwt.verify(token, process.env.TOKEN_KEY || "");
  if (!(decodedToken instanceof Object)) {
    throw new TokenInvalidError();
  }
  if (!("userId" in decodedToken)) {
    throw new TokenInvalidError();
  }
  return decodedToken as IdecodedTokenType;
};
