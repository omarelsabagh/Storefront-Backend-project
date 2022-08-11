import Client from './../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export class Users {
    //create user
    async createUser(userName: string, userPassword: string) {
        try {
            dotenv.config();
            const saltRounds = process.env.SALT_ROUNDS;
            const pepper = process.env.BCRYPT_PASSWORD;

            const conn = await Client.connect();
            const sql = `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`;
            const hash = bcrypt.hashSync(
                userPassword + pepper,
                parseInt(`${saltRounds}`)
            );
            const addedUsers = await conn.query(sql, [userName, hash]);

            conn.release();
            return addedUsers;
        } catch (error) {
            throw new Error(`couldn't add new user: ${error}`);
        }
    }

    //index users
    async getAllUsers() {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users`;

            const allUsers = await conn.query(sql);

            conn.release();
            return allUsers.rows;
        } catch (error) {
            throw new Error(`couldn't get all users: ${error}`);
        }
    }

    //show a user

    async getOneUser(id: number) {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM users where id=$1`;

            const allUsers = await conn.query(sql, [id]);

            conn.release();
            return allUsers.rows;
        } catch (error) {
            throw new Error(`couldn't get one user: ${error}`);
        }
    }
}
