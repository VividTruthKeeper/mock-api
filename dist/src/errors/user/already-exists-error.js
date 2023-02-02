"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistsError = void 0;
const custom_error_1 = require("../custom-error");
class AlreadyExistsError extends custom_error_1.CustomError {
    constructor() {
        super("User with this email already exists");
        this.statusCode = 409;
        this.reason = "User with this email already exists";
        this.field = "email";
        Object.setPrototypeOf(this, AlreadyExistsError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason, field: this.field }];
    }
}
exports.AlreadyExistsError = AlreadyExistsError;
//# sourceMappingURL=already-exists-error.js.map