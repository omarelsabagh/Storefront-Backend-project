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
const products_model_1 = require("./../models/products.model");
const products = new products_model_1.Products();
describe('GET /products', function () {
    it('response status 401 no token', async function () {
        const response = await (0, supertest_1.default)(server_1.app).get('/products');
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
    });
});
describe('GET /products/:id', function () {
    it('response status 401 no token', async function () {
        const response = await (0, supertest_1.default)(server_1.app).get('/products/1');
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
    });
});
describe('POST /products', function () {
    it('response status 401 no token', async function () {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/products')
            .send({ name: 'Nokia', price: 2000 });
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
        products.deleteAllProducts();
    });
});
