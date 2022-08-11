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
const express_1 = __importDefault(require("express"));
const products_model_1 = require("../models/products.model");
function productsHandeler(app) {
    app.post('/products', express_1.default.json(), create);
    app.get('/products', express_1.default.json(), index);
    app.get('/products/:id', express_1.default.json(), show);
}
const products = new products_model_1.Products();
//create product
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.name;
            const price = parseInt(req.body.price);
            const addedProduct = yield products.addProductToDB(name, price);
            res.json({
                message: 'product added to DB successfully',
                addedProduct: addedProduct,
            });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
//get all products
function index(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allProducts = yield products.showAllProducts();
            res.json({ message: 'get all products from DB successfully', allProducts });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
//get one user
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            const oneProduct = yield products.getOneProduct(userId);
            res.json({ message: 'get one product from DB successfully', oneProduct });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
exports.default = productsHandeler;
