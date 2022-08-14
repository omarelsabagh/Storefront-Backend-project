"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const allRoutes_1 = require("./routes/allRoutes");
exports.app = (0, express_1.default)();
const port = process.env.PORT;
(0, allRoutes_1.fetchAllRoutes)(exports.app);
exports.app.listen(port, () => {
    console.log(`local server is working on port: ${port}`);
});
