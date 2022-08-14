"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.ENV = 'test';
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("./../server");
const orders_model_1 = require("./../models/orders.model");
const users_model_1 = require("../models/users.model");
const users = new users_model_1.Users();
const orders = new orders_model_1.Orders();
describe('POST /orders/:id', function () {
    it('response status 401 no token', async function () {
        const username = 'john';
        const password = 'jhon@123';
        const addedUser = await users.createUser(username, password);
        const userId = addedUser.id;
        const response = await (0, supertest_1.default)(server_1.app)
            .post(`/orders/${userId}`)
            .send({ status: 'active' });
        expect(response.status).toEqual(401);
        orders.deleteAllOrders();
        users.deleteAllusers();
    });
});
