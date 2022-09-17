"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//to use the testing environment for testing
process.env.ENV = 'test';
const orders_model_1 = require("../models/orders.model");
const users_model_1 = require("../models/users.model");
const orders = new orders_model_1.Orders();
const users = new users_model_1.Users();
//tsting if functions defined
describe('Testing if the Order model functions are defined', () => {
    it('Expect index model to be defined', () => {
        expect(orders.addOrder).toBeDefined();
    });
});
//tsting if functions work correctly
describe('Testing if the Order model functions work correctly', () => {
    it('Expect create method to return object', async () => {
        const username = 'Omar';
        const email = 'Omar@gamil.com';
        const password = 'omar@123';
        //create user for foriegn key
        const user = await users.createUser(username, email, password);
        const status = 'active';
        const userID = user.id;
        const result = await orders.addOrder(status, userID);
        expect(result).toEqual({
            id: result.id,
            status: 'active',
            user_id: `${userID}`,
        });
        //clean database
        await orders.deleteAllOrders();
        await users.deleteAllusers();
    });
});
