"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInvalidError = void 0;
const custom_error_1 = require("../custom-error");
class TokenInvalidError extends custom_error_1.CustomError {
    constructor() {
        super("Token is invalid or expired");
        this.statusCode = 401;
        this.reason = "Token is invalid or expired";
        this.field = "token";
        Object.setPrototypeOf(this, TokenInvalidError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason, field: this.field }];
    }
}
exports.TokenInvalidError = TokenInvalidError;
//# sourceMappingURL=token-invalid-error.js.map