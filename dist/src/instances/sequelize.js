"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const process_1 = __importDefault(require("process"));
// Models
const user_1 = require("../models/user");
const db = process_1.default.env.DB_NAME || "";
const username = process_1.default.env.DB_USERNAME || "";
const password = process_1.default.env.DB_PASSWORD || "";
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: db,
    dialect: "postgres",
    username: username,
    password: password,
    storage: ":memory:",
});
exports.sequelize.addModels([user_1.User]);
//# sourceMappingURL=sequelize.js.map