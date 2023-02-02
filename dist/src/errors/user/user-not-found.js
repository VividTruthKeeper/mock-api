"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFound = void 0;
const custom_error_1 = require("../custom-error");
class UserNotFound extends custom_error_1.CustomError {
    constructor() {
        super("User not found");
        this.statusCode = 404;
        this.reason = "User not found";
        Object.setPrototypeOf(this, UserNotFound.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.UserNotFound = UserNotFound;
//# sourceMappingURL=user-not-found.js.map