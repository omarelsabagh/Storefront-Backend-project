"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const database_1 = __importDefault(require("./../database"));
class Orders {
    //add order
    async addOrder(orderStatus, userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO orders ( status,user_id ) VALUES ($1,$2) RETURNING *`;
            const addedOrders = await conn.query(sql, [orderStatus, userId]);
            conn.release();
            return addedOrders.rows;
        }
        catch (error) {
            throw new Error(`couldnt add an order: ${error}`);
        }
    }
    async deleteAllOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM orders`;
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`couldn't delete all orders: ${error}`);
        }
    }
}
exports.Orders = Orders;
