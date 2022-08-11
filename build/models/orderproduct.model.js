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
exports.Orderproducts = void 0;
const database_1 = __importDefault(require("./../database"));
class Orderproducts {
    //add product to order
    addProductToOrder(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO order_products ( quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;
                const result = yield conn.query(sql, [
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
        });
    }
}
exports.Orderproducts = Orderproducts;
