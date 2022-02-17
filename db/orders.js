const { client } = require ('./client');


async function creatOrder ({ userId, status }) {
    console.log('this is the createOrders func')
    try {
        const { rows: [order] } = await client.query(
            `
            INSERT INTO orders("userId", status)
            VALUES ($1, $2)
            RETURNING *;
            `,
            [userId, status]);
        return order;
        
    } catch (error) {
        console.log('createOrder func failed');
        console.error(error);
    }
};

async function createProductUnits ({ orderId, productId, price }) {
    console.log('this is the createProductUnits func')
    try {
        const { rows: [order] } = await client.query(
            `
            INSERT INTO "productUnits"("orderId", "productId", price)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
            [orderId, productId, price]);
        return order;
        
    } catch (error) {
        console.log('createProductUnits func failed');
        console.error(error);
    }
};

module.exports =  {creatOrder, createProductUnits};