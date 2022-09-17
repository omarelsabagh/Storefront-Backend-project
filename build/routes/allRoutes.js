"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllRoutes = void 0;
const products_handeler_1 = __importDefault(require("./../handelers/products.handeler"));
const orders_handeler_1 = __importDefault(require("./../handelers/orders.handeler"));
const users_handeler_1 = __importDefault(require("./../handelers/users.handeler"));
const orderproduct_handeler_1 = __importDefault(require("./../handelers/orderproduct.handeler"));
//not to import all the functions in the server file
function fetchAllRoutes(app) {
    (0, products_handeler_1.default)(app);
    (0, users_handeler_1.default)(app);
    (0, orders_handeler_1.default)(app);
    (0, orderproduct_handeler_1.default)(app);
}
exports.fetchAllRoutes = fetchAllRoutes;
