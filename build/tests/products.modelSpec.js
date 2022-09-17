"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//to use the testing environment for testing
process.env.ENV = 'test';
const products_model_1 = require("../models/products.model");
const products = new products_model_1.Products();
//tsting if functions defined
describe('Testing if the Product model functions are defined', () => {
    it('Expect index model to be defined', () => {
        expect(products.showAllProducts).toBeDefined();
    });
    it('Expect create model to be defined', () => {
        expect(products.addProductToDB).toBeDefined();
    });
    it('Expect show model to be defined', () => {
        expect(products.getOneProduct).toBeDefined();
    });
});
//tsting if functions work correctly
describe('Testing if the Products model functions work correctly', () => {
    it('Expect index method to return empty array', async () => {
        const result = await products.showAllProducts();
        expect(result).toEqual([]);
    });
    it('Expect create method to return object', async () => {
        const name = 'Samsung';
        const price = 2000;
        const result = await products.addProductToDB(name, price);
        expect(result).toEqual({
            id: result.id,
            name: 'Samsung',
            price: 2000,
        });
        products.deleteAllProducts();
    });
    it('Expect show method to return empty array', async () => {
        const id = 1;
        const result = await products.getOneProduct(id);
        expect(result).toEqual([]);
    });
});
