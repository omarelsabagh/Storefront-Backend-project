import express, { Request, Response } from 'express';
import { Users } from '../models/users.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authMiddleware from './../middlewares/authmiddleware';
dotenv.config();

function userHandeler(app: express.Application) {
    app.post('/users', express.json(), create);
    app.post('/users/signin', express.json(), signin);
    app.get('/users', express.json(), authMiddleware, index);
    app.get('/users/:id', express.json(), authMiddleware, show);
}

const users = new Users();

//create user
async function create(req: Request, res: Response) {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;

        const addedUser = await users.createUser(username, password);
        //if the user is registered before check if there add key to the object called check with value 1
        if (addedUser.check == 1) {
            res.json({
                Error: 'username registered already, try another name',
            });
        } else {
            res.json({
                message: 'user added to DB successfully',
                addedUser: addedUser,
            });
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}
//signin users

async function signin(req: Request, res: Response) {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const signeduser = await users.signUsers(username, password);
        if (signeduser) {
            //CREATE THE TOKEN
            const Token = jwt.sign(
                { user: signeduser },
                `${process.env.TOKEN_SECRET}`
            );
            res.json({ message: 'sign in success', signeduser, Token });
        } else {
            res.json({ message: 'error: invalid username or password' });
        }
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
