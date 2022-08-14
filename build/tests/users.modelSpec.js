"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.ENV = 'test';
const users_model_1 = require("../models/users.model");
const users = new users_model_1.Users();
describe('Testing if the User model functions are defined', () => {
    it('Expect index model to be defined', () => {
        expect(users.getAllUsers).toBeDefined();
    });
    it('Expect create model to be defined', () => {
        expect(users.createUser).toBeDefined();
    });
    it('Expect show model to be defined', () => {
        expect(users.getOneUser).toBeDefined();
    });
});
describe('Testing if the User model functions work correctly', () => {
    it('Expect index method to return empty array', async () => {
        const result = await users.getAllUsers();
        expect(result).toEqual([]);
    });
    it('Expect create method to return object', async () => {
        const username = 'Omar';
        const password = 'omar@123';
        const result = await users.createUser(username, password);
        expect(result).toEqual({
            id: result.id,
            username: 'Omar',
            password: result.password,
        });
        users.deleteAllusers();
    });
    it('Expect signin method to return object', async () => {
        const username = 'Omar';
        const password = 'omar@123';
        await users.createUser(username, password);
        const result = await users.signUsers(username, password);
        if (result !== null) {
            expect(result).toEqual({
                id: result.id,
                username: 'Omar',
                password: result.password,
            });
            users.deleteAllusers();
        }
    });
    it('Expect show method to return empty array', async () => {
        const id = 1;
        const result = await users.getOneUser(id);
        expect(result).toEqual([]);
    });
});
