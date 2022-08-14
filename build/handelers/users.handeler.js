"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_model_1 = require("../models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authmiddleware_1 = __importDefault(require("./../middlewares/authmiddleware"));
dotenv_1.default.config();
function userHandeler(app) {
    app.post('/users', express_1.default.json(), create);
    app.post('/users/signin', express_1.default.json(), signin);
    app.get('/users', express_1.default.json(), authmiddleware_1.default, index);
    app.get('/users/:id', express_1.default.json(), authmiddleware_1.default, show);
}
const users = new users_model_1.Users();
//create user
async function create(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const addedUser = await users.createUser(username, password);
        if (addedUser.check == 1) {
            res.json({
                Error: 'username registered already, try another name',
            });
        }
        else {
            res.json({
                message: 'user added to DB successfully',
                addedUser: addedUser
            });
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
//signin users
async function signin(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const signeduser = await users.signUsers(username, password);
        if (signeduser) {
            const Token = jsonwebtoken_1.default.sign({ user: signeduser }, `${process.env.TOKEN_SECRET}`);
            res.json({ message: 'sign in success', signeduser, Token });
        }
        else {
            res.json({ message: 'error: invalid username or password' });
        }
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
//get all users
async function index(_req, res) {
    try {
        const allUsers = await users.getAllUsers();
        res.json({ message: 'get all users from DB successfully', allUsers });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
//get one user
async function show(req, res) {
    try {
        const userId = parseInt(req.params.id);
        const oneUser = await users.getOneUser(userId);
        res.json({ message: 'get one user from DB successfully', oneUser });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
exports.default = userHandeler;
