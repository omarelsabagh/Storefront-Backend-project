"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.ENV = 'test';
const supertest_1 = __importDefault(require("supertest"));
const users_model_1 = require("../models/users.model");
const server_1 = require("./../server");
const users = new users_model_1.Users();
describe('GET /users', function () {
    it('response status 401 no token', async function () {
        const response = await (0, supertest_1.default)(server_1.app).get('/users');
        expect(response.status).toEqual(401);
    });
});
describe('GET /users/:id', function () {
    it('response status 401 no token', async function () {
        const response = await (0, supertest_1.default)(server_1.app).get('/users/1');
        expect(response.status).toEqual(401);
    });
});
describe('POST /users', function () {
    it('response status 200', async function () {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/users')
            .send({ username: 'john', password: 'jhon@123' });
        expect(response.status).toEqual(200);
        users.deleteAllusers();
    });
});
describe('POST /users/signin', function () {
    it('response status 200', async function () {
        const username = 'john';
        const password = 'jhon@123';
        await users.createUser(username, password);
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/users/signin')
            .send({ username: 'john', password: 'jhon@123' });
        expect(response.status).toEqual(200);
        users.deleteAllusers();
    });
});
