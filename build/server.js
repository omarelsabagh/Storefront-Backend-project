"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const allRoutes_1 = require("./routes/allRoutes");
const app = (0, express_1.default)();
const port = 3000;
(0, allRoutes_1.fetchAllRoutes)(app);
// userHandeler(app);
// productsHandeler(app);
// ordersHandeler(app);
// orderProductHandeler(app);
app.listen(port, () => {
    console.log(`local server is working on port: ${port}`);
});
