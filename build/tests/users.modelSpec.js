"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//to use the testing environment for testing
process.env.ENV = 'test';
const users_model_1 = require("../models/users.model");
//getting the users Model
const users = new users_model_1.Users();
//tsting if functions defined
describe('Testing if the USER model functions are defined', () => {
    it('Expect INDEX model to be defined', () => {
        expect(users.getAllUsers).toBeDefined();
    });
    it('Expect CREATE model to be defined', () => {
        expect(users.createUser).toBeDefined();
    });
    it('Expect SHOW model to be defined', () => {
        expect(users.getOneUser).toBeDefined();
    });
});
//tsting if functions work correctly
describe('Testing if the User model functions work correctly', () => {
    it('Expect INDEX method to return empty array', async () => {
        const result = await users.getAllUsers();
        expect(result).toEqual([]);
    });
    it('Expect CREATE method to return object', async () => {
        const username = 'Omar';
        const email = 'Omar@gamil.com';
        const password = 'omar@123';
        const result = await users.createUser(username, email, password);
        expect(result).toEqual({
            id: result.id,
            username: 'Omar',
            email: 'Omar@gamil.com',
            password: result.password,
        });
        //cleaning database for other tests
        users.deleteAllusers();
    });
    it('Expect signin method to return object', async () => {
        const username = 'Omar';
        const email = 'Omar@gamil.com';
        const password = 'omar@123';
        //creating user to check on it
        await users.createUser(username, email, password);
        const result = await users.signUsers(email, password);
        //condition if the function worked correctly
        if (result !== null) {
            expect(result).toEqual({
                id: result.id,
                username: 'Omar',
                email: 'Omar@gamil.com',
                password: result.password,
            });
            //cleaning database for other tests
            users.deleteAllusers();
        }
    });
    it('Expect show method to return empty array', async () => {
        const id = 1;
        const result = await users.getOneUser(id);
        expect(result).toEqual([]);
    });
});
