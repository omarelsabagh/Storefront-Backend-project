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
exports.Products = void 0;
const database_1 = __importDefault(require("./../database"));
class Products {
    //create product
    addProductToDB(productName, price) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *`;
                const addedProductes = yield conn.query(sql, [productName, price]);
                conn.release();
                return addedProductes.rows;
            }
            catch (error) {
                throw new Error(`couldnt add product to DB: ${error}`);
            }
        });
    }
    //show products
    showAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM products`;
                const allProducts = yield conn.query(sql);
                conn.release();
                return allProducts.rows;
            }
            catch (error) {
                throw new Error(`couldn't get all products: ${error}`);
            }
        });
    }
    //show one product
    getOneProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM products where id=$1`;
                const allProducts = yield conn.query(sql, [id]);
                conn.release();
                return allProducts.rows;
            }
            catch (error) {
                throw new Error(`couldn't get one product: ${error}`);
            }
        });
    }
}
exports.Products = Products;
