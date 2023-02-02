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
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const comparePassword_1 = require("../functions/comparePassword");
const user_1 = require("../models/user");
const request_validation_error_1 = require("../errors/request-validation-error");
const createToken_1 = require("../functions/createToken");
const router = express_1.default.Router();
exports.signinRouter = router;
router.post("/api/users/signIn", [(0, express_validator_1.body)("email").isEmail().withMessage("Invalid email")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    let passwordCorrect = false;
    let result;
    const sanitizedEmail = email.toLowerCase();
    const userByEmail = yield user_1.User.findOne({
        where: { email: sanitizedEmail },
    });
    if (userByEmail) {
        result = yield userByEmail.get();
        passwordCorrect = yield (0, comparePassword_1.comparePassword)(password, result.hash);
    }
    if (passwordCorrect) {
        console.log(userByEmail === null || userByEmail === void 0 ? void 0 : userByEmail.token);
        userByEmail === null || userByEmail === void 0 ? void 0 : userByEmail.update({ token: (0, createToken_1.createToken)(result.userId, result.email) });
        res.status(200).send({
            status: "success",
            data: result,
        });
    }
    else {
        res.status(401).send({
            status: "failed",
            message: "Incorrect password",
        });
    }
}));
//# sourceMappingURL=signin.js.map