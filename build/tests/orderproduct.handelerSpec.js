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
const products_model_1 = require("./../models/products.model");
const orderproduct_model_1 = require("./../models/orderproduct.model");
const orderproducts = new orderproduct_model_1.Orderproducts();
const users = new users_model_1.Users();
const orders = new orders_model_1.Orders();
const products = new products_model_1.Products();
describe('POST /orders/:id/products', function () {
    it('response status 401 no token', async function () {
        //add user
        const username = 'Omar';
        const password = 'omar@123';
        const user = await users.createUser(username, password);
        //add product
        const name = 'Samsung';
        const price = 2000;
        const product = await products.addProductToDB(name, price);
        //add order by user
        const status = 'active';
        const userID = (user.id);
        const order = await orders.addOrder(status, userID);
        //add product to order
        //order id forign key from orders table id
        const orderId = order[0].id;
        //product id forign key from products table id
        const productId = product[0].id;
        const response = await (0, supertest_1.default)(server_1.app)
            .post(`/orders/${orderId}/products`)
            .send({ quantity: 20, productid: productId });
        expect(response.status).toEqual(401);
        await orderproducts.deleteAllOrderProducts();
        await orders.deleteAllOrders();
        await products.deleteAllProducts();
        await users.deleteAllusers();
    });
});
