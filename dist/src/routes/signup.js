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
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const uuid_1 = require("uuid");
// Errors
const request_validation_error_1 = require("../errors/request-validation-error");
// Models
const user_1 = require("../models/user");
const hashPassword_1 = require("../functions/hashPassword");
const already_exists_error_1 = require("../errors/user/already-exists-error");
const createToken_1 = require("../functions/createToken");
const router = express_1.default.Router();
exports.signupRouter = router;
router.post("/api/users/signUp", [
    (0, express_validator_1.body)("name")
        .isLength({ min: 3, max: 20 })
        .withMessage("Name must be between 3 and 20 characters"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 8, max: 64 })
        .matches(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)
        .withMessage("Password must be between 8 and 64 characters, must contain 1 number, 1 uppercase and 1 lowercase letters, and 1 special character"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { name, email, password } = req.body;
    const sanitizedEmail = email.toLowerCase();
    // Check duplicate email
    const userWithEmail = yield user_1.User.findOne({
        where: { email: sanitizedEmail },
    });
    if (userWithEmail !== null) {
        throw new already_exists_error_1.AlreadyExistsError();
    }
    // Create id
    const userId = (0, uuid_1.v4)();
    // Create token
    const token = (0, createToken_1.createToken)(userId, email);
    // Create user
    const user = yield user_1.User.create({
        name: name,
        email: email.toLowerCase(),
        hash: yield (0, hashPassword_1.hashPassword)(password),
        userId: userId,
        token: token,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
    res.send({
        status: "success",
        data: user.get(),
    });
}));
//# sourceMappingURL=signup.js.map