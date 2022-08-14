"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orderproducts = void 0;
const database_1 = __importDefault(require("./../database"));
class Orderproducts {
    //add product to order
    async addProductToOrder(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO order_products ( quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (error) {
            throw new Error(`couldnt add product to an order: ${error}`);
        }
    }
    //delete all order products
    async deleteAllOrderProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM order_products`;
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`couldn't delete all users: ${error}`);
        }
    }
}
exports.Orderproducts = Orderproducts;
