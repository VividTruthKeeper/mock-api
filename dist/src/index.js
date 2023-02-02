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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("express-async-errors");
const body_parser_1 = require("body-parser");
dotenv_1.default.config();
// Routes
const current_user_1 = require("./routes/current-user");
const signin_1 = require("./routes/signin");
const signout_1 = require("./routes/signout");
const signup_1 = require("./routes/signup");
// Middlewares
const error_handler_1 = require("./middlewares/error-handler");
// Errors
const not_found_error_1 = require("./errors/not-found-error");
const database_connection_error_1 = require("./errors/database-connection-error");
// DB
const sequelize_1 = require("./instances/sequelize");
const initDatabase_1 = require("./functions/initDatabase");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(current_user_1.currentUserRouter);
    app.use(signin_1.signinRouter);
    app.use(signout_1.signoutRouter);
    app.use(signup_1.signupRouter);
    try {
        yield sequelize_1.sequelize.authenticate();
    }
    catch (err) {
        console.log(err);
        (0, initDatabase_1.initDatabase)(process.env.DB_NAME || "");
    }
    try {
        yield sequelize_1.sequelize.sync();
    }
    catch (err) {
        console.log(err);
        throw new database_connection_error_1.DatabaseConnectionError();
    }
    app.all("*", () => __awaiter(void 0, void 0, void 0, function* () {
        throw new not_found_error_1.NotFoundError();
    }));
    app.use(error_handler_1.errorHandler);
    const port = process.env.API_PORT || 8080;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
});
void start();
exports.default = app;
//# sourceMappingURL=index.js.map