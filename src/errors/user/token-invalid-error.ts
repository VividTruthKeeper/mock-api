import { CustomError } from "../custom-error";

export class TokenInvalidError extends CustomError {
  statusCode = 401;
  reason = "Token is invalid or expired";
  field = "token";
  constructor() {
    super("Token is invalid or expired");
    Object.setPrototypeOf(this, TokenInvalidError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason, field: this.field }];
  }
}
