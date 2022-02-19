const { client } = require ('./client');


async function createOrder ( userId, status ) {
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

async function createProductUnits ( {orderId, productId, price} ) {
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

async function userCheckForInCart ( userId, status ) {
    console.log("Running UserOrderCheck func");
    try{
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId" = $1 AND status = $2
            ;
        `, [userId, status]);

        console.log("Status from userCheckForInCart", order)

        if(order){
            console.log("userCheckForIntCart is:", true )
            return true
        } else{
            console.log("userCheckForIntCart is:", false )
            return false
        }

    } catch (error){
        console.log('userOrderCheck func failed');
        console.error(error);
    }
}

module.exports =  {createOrder, createProductUnits, userCheckForInCart};