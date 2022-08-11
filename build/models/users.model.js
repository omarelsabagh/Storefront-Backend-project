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
exports.Users = void 0;
const database_1 = __importDefault(require("./../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
class Users {
    //create user
    createUser(userName, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dotenv_1.default.config();
                const saltRounds = process.env.SALT_ROUNDS;
                const pepper = process.env.BCRYPT_PASSWORD;
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`;
                const hash = bcrypt_1.default.hashSync(userPassword + pepper, parseInt(`${saltRounds}`));
                const addedUsers = yield conn.query(sql, [userName, hash]);
                conn.release();
                return addedUsers;
            }
            catch (error) {
                throw new Error(`couldn't add new user: ${error}`);
            }
        });
    }
    //index users
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users`;
                const allUsers = yield conn.query(sql);
                conn.release();
                return allUsers.rows;
            }
            catch (error) {
                throw new Error(`couldn't get all users: ${error}`);
            }
        });
    }
    //show a user
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users where id=$1`;
                const allUsers = yield conn.query(sql, [id]);
                conn.release();
                return allUsers.rows;
            }
            catch (error) {
                throw new Error(`couldn't get one user: ${error}`);
            }
        });
    }
}
exports.Users = Users;
