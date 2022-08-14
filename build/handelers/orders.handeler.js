"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_model_1 = require("./../models/orders.model");
const authmiddleware_1 = __importDefault(require("./../middlewares/authmiddleware"));
function ordersHandeler(app) {
    app.post('/orders/:id', express_1.default.json(), authmiddleware_1.default, Create);
}
const orders = new orders_model_1.Orders();
//add order
async function Create(req, res) {
    try {
        const status = req.body.status;
        const userId = req.params.id;
        const addedOrder = await orders.addOrder(status, userId);
        res.json({
            message: 'order added to DB successfully',
            added_order: addedOrder,
        });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
exports.default = ordersHandeler;
