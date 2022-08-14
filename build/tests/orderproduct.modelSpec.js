"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.ENV = 'test';
const orders_model_1 = require("../models/orders.model");
const users_model_1 = require("../models/users.model");
const orderproduct_model_1 = require("./../models/orderproduct.model");
const products_model_1 = require("./../models/products.model");
const orders = new orders_model_1.Orders();
const users = new users_model_1.Users();
const orderproducts = new orderproduct_model_1.Orderproducts();
const products = new products_model_1.Products();
describe('Testing if the OrderProduct model functions are defined', () => {
    it('Expect create model to be defined', () => {
        expect(orderproducts.addProductToOrder).toBeDefined();
    });
});
describe('Testing if the OrderProduct model functions work correctly', () => {
    it('Expect create method to return object', async () => {
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
        const quantityOrderProduct = parseInt('20');
        //order id forign key from orders table id
        const orderId = order[0].id;
        //product id forign key from products table id
        const productId = product[0].id;
        const result = await orderproducts.addProductToOrder(quantityOrderProduct, orderId, productId);
        expect(result).toEqual({
            quantity: 20,
            order_id: `${orderId}`,
            product_id: `${productId}`,
        });
        await orderproducts.deleteAllOrderProducts();
        await orders.deleteAllOrders();
        await products.deleteAllProducts();
        await users.deleteAllusers();
    });
});
