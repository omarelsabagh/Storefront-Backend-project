import dotenv from 'dotenv';

dotenv.config();
//to use the testing environment for testing
process.env.ENV = 'test';
import request from 'supertest';
import { app } from './../server';
import { Products } from './../models/products.model';

const products = new Products();

describe('GET /products', function () {
    it('response status 401 no token', async function () {
        const response = await request(app).get('/products');
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
    });
});

describe('GET /products/:id', function () {
    it('response status 401 no token', async function () {
        const response = await request(app).get('/products/1');
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
    });
});

describe('POST /products', function () {
    it('response status 401 no token', async function () {
        const response = await request(app)
            .post('/products')
            .send({ name: 'Nokia', price: 2000 });
        //expect the response to be 401 because no token provided. not authurized
        expect(response.status).toEqual(401);
        products.deleteAllProducts();
    });
});
