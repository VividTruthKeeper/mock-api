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
exports.initDatabase = void 0;
const pg_1 = require("pg");
const process_1 = __importDefault(require("process"));
const initDatabase = (dbName) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new pg_1.Client({
        host: "127.0.0.1",
        user: process_1.default.env.DB_USERNAME || "",
        password: process_1.default.env.DB_PASSWORD || "",
        port: 5432,
    });
    try {
        yield client.connect(); // gets connection
        yield client.query(`CREATE DATABASE ${dbName}`); // sends queries
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
    finally {
        yield client.end();
    }
});
exports.initDatabase = initDatabase;
//# sourceMappingURL=initDatabase.js.map