"use strict";
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
    async createUser(userName, email, userPassword) {
        try {
            const conn = await database_1.default.connect();
            const sql1 = `SELECT * FROM users WHERE email=$1`;
            const returnedUser = await conn.query(sql1, [email]);
            //checking if the email from request already exist in database
            if (returnedUser.rows.length > 0) {
                //if yes add a new property to the returned object and return it
                returnedUser.rows[0].check = 1;
                return returnedUser.rows[0];
            }
            else {
                //if the email not registered before then hash the password and add the user to DB
                dotenv_1.default.config();
                const saltRounds = process.env.SALT_ROUNDS;
                const pepper = process.env.BCRYPT_PASSWORD;
                const conn = await database_1.default.connect();
                const sql = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *`;
                const hash = bcrypt_1.default.hashSync(userPassword + pepper, parseInt(`${saltRounds}`));
                const addedUsers = await conn.query(sql, [userName, email, hash]);
                conn.release();
                return addedUsers.rows[0];
            }
        }
        catch (error) {
            throw new Error(`couldn't add new user: ${error}`);
        }
    }
    //signin users and auth function
    async signUsers(userEmail, userPassword) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const conn = await database_1.default.connect();
            const sql = `select * from users where email=$1`;
            const result = await conn.query(sql, [userEmail]);
            //checking if the username from request is in DB
            if (result.rows.length) {
                //if yes check if the password entered is correct
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(userPassword + pepper, user.password)) {
                    conn.release();
                    //if yes return the user
                    return user;
                }
                conn.release();
                return null;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw new Error(`can't sign in: ${error}`);
        }
    }
    //index users
    async getAllUsers() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM users`;
            const allUsers = await conn.query(sql);
            conn.release();
            return allUsers.rows;
        }
        catch (error) {
            throw new Error(`couldn't get all users: ${error}`);
        }
    }
    //show a user
    async getOneUser(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM users where id=$1`;
            const allUsers = await conn.query(sql, [id]);
            conn.release();
            return allUsers.rows;
        }
        catch (error) {
            throw new Error(`couldn't get one user: ${error}`);
        }
    }
    //delete all users
    async deleteAllusers() {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM users`;
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`couldn't delete all users: ${error}`);
        }
    }
}
exports.Users = Users;
