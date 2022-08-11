import express, { Request, Response } from 'express';
import { Users } from '../models/users.model';
import jwt from 'jsonwebtoken';

function userHandeler(app: express.Application) {
    app.post('/users', express.json(), create);
    app.get('/users', express.json(), index);
    app.get('/users/:id', express.json(), show);
}

const users = new Users();

//create user
async function create(req: Request, res: Response) {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;

        const addedUser = await users.createUser(username, password);

        var Token = jwt.sign(
            { user: addedUser },
            `${process.env.TOKEN_SECRET}`
        );
        res.json({ message: 'user added to DB successfully', Token: Token });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

//get all users

async function index(_req: Request, res: Response) {
    try {
        const allUsers = await users.getAllUsers();

        res.json({ message: 'get all users from DB successfully', allUsers });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

//get one user

async function show(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.id);
        const oneUser = await users.getOneUser(userId);

        res.json({ message: 'get one user from DB successfully', oneUser });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
export default userHandeler;
