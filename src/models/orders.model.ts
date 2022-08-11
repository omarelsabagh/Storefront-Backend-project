import Client from './../database';

export class Orders {
    //add order
    async addOrder(orderStatus: string, quantity: number, userId: string) {
        try {
            const conn = await Client.connect();
            const sql = `INSERT INTO orders ( status, quantity,user_id ) VALUES ($1,$2,$3) RETURNING *`;

            const addedOrders = await conn.query(sql, [
                orderStatus,
                quantity,
                userId,
            ]);

            conn.release();

            return addedOrders.rows;
        } catch (error) {
            throw new Error(`couldnt add an order: ${error}`);
        }
    }
}
