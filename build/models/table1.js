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
exports.Lol = void 0;
const database_1 = __importDefault(require("./../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
class Lol {
    // async createRow()  {
    //     try {
    //         const conn = await Client.connect() ;
    //         const sql = `INSERT INTO books (title,total_pages,author,type,summary) VALUES ('Nelo',225,'Sadeq','Romantic','Love')`;
    //        await conn.query(sql);
    //         conn.release();
    //     } catch (error) {
    //         throw new Error(`Add new book: ${error}`)
    //     }
    //         }
    //         async readTable() :Promise<Book[]> {
    //             try {
    //                 const conn = await Client.connect();
    //                 const sql = `SELECT * FROM books`;
    //                 const result = await conn.query(sql);
    //                 conn.release();
    //                 return result.rows;
    //             } catch (error) {
    //                 throw new Error(`Could not get books. Error: ${error}`)
    //             }
    //                 }
    createUser(userName, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dotenv_1.default.config();
                const saltRounds = process.env.SALT_ROUNDS;
                const pepper = process.env.BCRYPT_PASSWORD;
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO users (name,password) VALUES ($1,$2)`;
                const hash = bcrypt_1.default.hashSync(userPassword + pepper, parseInt(`${saltRounds}`));
                yield conn.query(sql, [userName, hash]).then(() => {
                    console.log('connected to database');
                });
                conn.release();
            }
            catch (error) {
                throw new Error(`Add new book: ${error}`);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not get users. Error: ${error}`);
            }
        });
    }
    signIn(userName, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = process.env.SALT_ROUNDS;
                const pepper = process.env.BCRYPT_PASSWORD;
                const conn = yield database_1.default.connect();
                const sql = `select password from users where name='${userName}'`;
                // const hash = bcrypt.hashSync(userPassword+pepper,parseInt(`${saltRounds}`));
                const result = yield conn.query(sql);
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(userPassword + pepper, user.password)) {
                    conn.release();
                    return user;
                }
                conn.release();
                return null;
            }
            catch (error) {
                throw new Error(`can't sign in: ${error}`);
            }
        });
    }
}
exports.Lol = Lol;
