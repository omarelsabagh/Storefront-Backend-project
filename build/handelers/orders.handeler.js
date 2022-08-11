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
const orders_model_1 = require("./../models/orders.model");
function ordersHandeler(app) {
    app.post('/orders/:id', express_1.default.json(), Create);
}
const orders = new orders_model_1.Orders();
//add order
function Create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const status = req.body.status;
            const quantity = parseInt(req.body.quantity);
            const userId = req.params.id;
            const addedOrder = yield orders.addOrder(status, quantity, userId);
            res.json({
                message: 'order added to DB successfully',
                added_order: addedOrder,
            });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
exports.default = ordersHandeler;
