const { client } = require("./client");

async function createOrder(userId) {
    try {


        console.log('inside creatOrder');
        const {rows: [myOrders] = await client.query(`
            INSERT INTO orders(userId)
            VALUES $1
            RETURNING *;
             `, [userId]) }

             return myOrders;
        
    } catch (error) {
        throw error;        
    }
}

async function deleteOrder(){
    try {
        const {rows:[deletedOrder]} = await client.query(`
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
        `, [id])
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    deleteOrder
};

