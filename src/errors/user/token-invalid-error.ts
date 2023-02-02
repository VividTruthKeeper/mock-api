import { CustomError } from "../custom-error";

export class TokenInvalidError extends CustomError {
  statusCode = 401;
  reason = "Token is invalid or expired";
  field = "token";
  constructor(message?: string) {
    super("User with this email already exists");
    Object.setPrototypeOf(this, TokenInvalidError.prototype);
    message = this.message;
  }

  serializeErrors() {
    return [
      { message: this.message ? this.message : this.reason, field: this.field },
    ];
  }
}
