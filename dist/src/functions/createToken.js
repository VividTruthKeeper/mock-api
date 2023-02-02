"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId: userId, email }, process.env.TOKEN_KEY || "", {
        expiresIn: process.env.TOKEN_EXPIRES_IN || "2h",
    });
};
exports.createToken = createToken;
//# sourceMappingURL=createToken.js.map