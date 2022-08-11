import express from 'express';
import productsHandeler from './../handelers/products.handeler';
import ordersHandeler from './../handelers/orders.handeler';
import userHandeler from './../handelers/users.handeler';
import orderProductHandeler from './../handelers/orderproduct.handeler';

export function fetchAllRoutes(app: express.Application) {
    productsHandeler(app);
    userHandeler(app);
    ordersHandeler(app);
    orderProductHandeler(app);
}
