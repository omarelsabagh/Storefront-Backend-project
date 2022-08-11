import express, { Request, Response } from 'express';
import { Orders } from './../models/orders.model';

function ordersHandeler(app: express.Application) {
    app.post('/orders/:id', express.json(), Create);
}

const orders = new Orders();

//add order
async function Create(req: Request, res: Response) {
    try {
        const status: string = req.body.status;
        const quantity: number = parseInt(req.body.quantity);
        const userId: string = req.params.id;
        const addedOrder = await orders.addOrder(status, quantity, userId);
        res.json({
            message: 'order added to DB successfully',
            added_order: addedOrder,
        });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export default ordersHandeler;
