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
const users_model_1 = require("../models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userHandeler(app) {
    app.post('/users', express_1.default.json(), create);
    app.get('/users', express_1.default.json(), index);
    app.get('/users/:id', express_1.default.json(), show);
}
const users = new users_model_1.Users();
//create user
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const addedUser = yield users.createUser(username, password);
            var Token = jsonwebtoken_1.default.sign({ user: addedUser }, `${process.env.TOKEN_SECRET}`);
            res.json({ message: 'user added to DB successfully', Token: Token });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
//get all users
function index(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield users.getAllUsers();
            res.json({ message: 'get all users from DB successfully', allUsers });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
//get one user
function show(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            const oneUser = yield users.getOneUser(userId);
            res.json({ message: 'get one user from DB successfully', oneUser });
        }
        catch (error) {
            res.status(400);
            res.json(error);
        }
    });
}
exports.default = userHandeler;
