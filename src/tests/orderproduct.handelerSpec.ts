import dotenv from 'dotenv';

dotenv.config();
//to use the testing environment for testing
process.env.ENV = 'test';
import request from 'supertest';
import { app } from './../server';
import { Orders } from './../models/orders.model';
import { Users } from '../models/users.model';
import { Products } from './../models/products.model';
import { Orderproducts } from './../models/orderproduct.model';

const orderproducts = new Orderproducts();
const users = new Users();
const orders = new Orders();
const products = new Products();

describe('POST /orders/:id/products', function () {
    it('response status 401 no token', async function () {
        //add user
        const username: string = 'Omar';
        const password: string = 'omar@123';

        const user = await users.createUser(username, password);

        //add product
        const name: string = 'Samsung';
        const price: number = 2000;

        const product = await products.addProductToDB(name, price);
        //add order by user
        const status: string = 'active';

        const userID: string = user.id as string;
        const order = await orders.addOrder(status, userID);

        //add product to order

        //order id forign key from orders table id
        const orderId: string = order.id as string;
        //product id forign key from products table id
        const productId: string = product.id as string;

        const response = await request(app)
            .post(`/orders/${orderId}/products`)
            //request body
            .send({ quantity: 20, productid: productId });

        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);

        //clean database
        await orderproducts.deleteAllOrderProducts();
        await orders.deleteAllOrders();
        await products.deleteAllProducts();
        await users.deleteAllusers();
    });
});
