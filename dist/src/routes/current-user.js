"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const token_invalid_error_1 = require("../errors/user/token-invalid-error");
const user_not_found_1 = require("../errors/user/user-not-found");
const auth_verify_1 = require("../middlewares/auth-verify");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.currentUserRouter = router;
router.get("/api/users/currentUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    if (!token) {
        throw new token_invalid_error_1.TokenInvalidError();
    }
    const { userId } = yield (0, auth_verify_1.authVerify)(token);
    const userByUserId = yield user_1.User.findOne({ where: { userId: userId } });
    if (userByUserId) {
        res.status(200).send({
            status: "success",
            data: userByUserId.get(),
        });
    }
    else {
        throw new user_not_found_1.UserNotFound();
    }
}));
//# sourceMappingURL=current-user.js.map