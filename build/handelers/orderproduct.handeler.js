"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderproduct_model_1 = require("./../models/orderproduct.model");
const authmiddleware_1 = __importDefault(require("./../middlewares/authmiddleware"));
function orderProductHandeler(app) {
    app.post('/orders/:id/products', express_1.default.json(), authmiddleware_1.default, addProductToOrder);
}
const orderproducts = new orderproduct_model_1.Orderproducts();
async function addProductToOrder(req, res) {
    try {
        const quantity = parseInt(req.body.quantity);
        const orderId = req.params.id;
        const productId = req.body.productid;
        const addedProduct = await orderproducts.addProductToOrder(quantity, orderId, productId);
        res.json({
            message: 'product added to order successfully',
            addedProduct: addedProduct,
        });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
exports.default = orderProductHandeler;
