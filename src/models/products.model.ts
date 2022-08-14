import Client from './../database';

interface Product {
    id?: number | string;
    name: string;
    price: number | string;
}
export class Products {
    //create product

    async addProductToDB(productName: string, price: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *`;

            const addedProductes = await conn.query(sql, [productName, price]);

            conn.release();

            return addedProductes.rows[0];
        } catch (error) {
            throw new Error(`couldnt add product to DB: ${error}`);
        }
    }

    //show products

    async showAllProducts(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products`;

            const allProducts = await conn.query(sql);

            conn.release();
            return allProducts.rows;
        } catch (error) {
            throw new Error(`couldn't get all products: ${error}`);
        }
    }

    //show one product

    async getOneProduct(id: number): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM products where id=$1`;

            const allProducts = await conn.query(sql, [id]);

            conn.release();
            return allProducts.rows;
        } catch (error) {
            throw new Error(`couldn't get one product: ${error}`);
        }
    }

    //delete all products

    async deleteAllProducts(): Promise<void> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM products`;

            await conn.query(sql);

            conn.release();
        } catch (error) {
            throw new Error(`couldn't delete all products: ${error}`);
        }
    }
}
