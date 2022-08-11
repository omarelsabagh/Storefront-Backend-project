import Client from './../database';

export class Orderproducts {
    //add product to order
    async addProductToOrder(
        quantity: number,
        orderId: string,
        productId: string
    ) {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO order_products ( quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING *`;

            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            const order = result.rows[0];

            conn.release();

            return order;
        } catch (error) {
            throw new Error(`couldnt add product to an order: ${error}`);
        }
    }
}
