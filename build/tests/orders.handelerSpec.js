"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//to use the testing environment for testing
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
        const email = 'john@gmail.com';
        const password = 'jhon@123';
        //create user for foriegn key
        const addedUser = await users.createUser(username, email, password);
        const userId = addedUser.id;
        const response = await (0, supertest_1.default)(server_1.app)
            .post(`/orders/${userId}`)
            .send({ status: 'active' });
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
        //clean database
        orders.deleteAllOrders();
        users.deleteAllusers();
    });
});
