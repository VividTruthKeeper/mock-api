"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const index_1 = __importDefault(require("../index"));
describe("POST", () => {
    test("POST /api/users/signup", (done) => {
        request(index_1.default)
            .post("/api/users/signup")
            .expect("Content-Type", /json/)
            .expect(200)
            .send({
            email: "asd@gmail.com",
            password: "A2dsa!3",
        });
    });
});
//# sourceMappingURL=index.test.js.map