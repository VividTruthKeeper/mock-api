import jwt from "jsonwebtoken";

export const createToken = (userId: string, email: string): string => {
  return jwt.sign({ user_id: userId, email }, process.env.TOKEN_KEY || "", {
    expiresIn: "2h",
  });
};
