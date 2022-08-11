import Client from './../database';

export class Products {
    //create product

    async addProductToDB(productName: string, price: number) {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *`;

            const addedProductes = await conn.query(sql, [productName, price]);

            conn.release();

            return addedProductes.rows;
        } catch (error) {
            throw new Error(`couldnt add product to DB: ${error}`);
        }
    }

    //show products

    async showAllProducts() {
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

    async getOneProduct(id: number) {
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
}
