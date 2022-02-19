
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

// async function createOrder ( {userId, status} ) {
//     console.log('this is the createOrders func')
//     try {
//         const { rows: [order] } = await client.query(
//             `
//             INSERT INTO orders("userId", status)
//             VALUES ($1, $2)
//             RETURNING *;
//             `,
//             [userId, status]);
//             console.log('creatorders successful')
//         return order;
        
//     } catch (error) {
//         console.log('createOrder func failed');
//         console.error(error);
//     }
// };

// async function createProductUnits ( {orderId, productId, price} ) {
//     console.log('this is the createProductUnits func')
//     try {
//         const { rows: [order] } = await client.query(
//             `
//             INSERT INTO "productUnits"("orderId", "productId", price)
//             VALUES ($1, $2, $3)
//             RETURNING *;
//             `,
//             [orderId, productId, price]);
//         return order;
        
//     } catch (error) {
//         console.log('createProductUnits func failed');
//         console.error(error);
//     }
// };

async function getProductUnits() {
    try {
        const { rows: productUnits} = await client.query(`
        SELECT *
        FROM "productUnits"
        `);
        return productUnits;
    } catch (error) {
        throw error;
    }
}


// maske function to make entry in producvt units
//orderId, product id, price
// async function createProductUnit() {
//     try {

//         const rows = await client.query(`
//         INSERT INTO "productUnits"(orderId, productId, price)
//         VALUES ($1, $2, $3)
//         RETURNING *;
//         `,
//         [orderId, productId, price]);
//         return rows;
        
//     } catch (error) {
//         console.error(error);
//     }
// }



// async function createOrder( { userId, status } ) {
//     try {

//         console.log('inside creatOrder');
//         const {rows: [orders] } = await client.query(`
//             INSERT INTO orders("userId", status)
//             VALUES ($1, $2)
//             RETURNING *;
//              `, [userId, status]) 

// async function createOrder( { userId, status } ) {
//     try {

//         console.log('inside creatOrder');
//         const {rows: [orders] } = await client.query(`
//             INSERT INTO orders("userId", status)
//             VALUES ($1, $2)
//             RETURNING *;
//              `, [userId, status]) 

//              return orders;
        
//     } catch (error) {
//         throw error;        
//     }
// }
//get personal orders
//update to join with users table

async function getOrders() {
    try {
      const {rows} = await client.query(`
        SELECT * FROM orders;
      `)  
      return rows;
    } catch (error) {
        console.error(error)
    }
}

async function getOrderByOrderID (orderId) {
    try {
        const {rows} = await client.query(`
        SELECT orders.id, orders."userId", orders.status, "productUnits"."productId", products.title, products.price, products.picture
        FROM orders
        JOIN "productUnits" 
            ON (orders.id = "productUnits"."orderId") 
        JOIN users
            ON (users.id = orders."userId")
        JOIN products
            ON (products.id = "productUnits"."productId")
        WHERE orders.id = ${orderId};
        `);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

async function getOrderByUserId (userId) {
    try {
        const {rows} = await client.query(`
        SELECT orders.id, orders."userId", orders.status, "productUnits"."productId", products.title, products.price, products.picture
        FROM orders
        JOIN "productUnits" 
            ON (orders.id = "productUnits"."orderId") 
        JOIN users
            ON (users.id = orders."userId")
        JOIN products
            ON (products.id = "productUnits"."productId")
        WHERE orders.id = ${userId};
        `);
        return rows;
    } catch (error) {
        console.error(error);
    }
}
// async function getOrderByUserId (userId) {
//     try {
//         const {rows} = await client.query(`
//         SELECT orders.id, orders."userId", orders.status, "productUnits"."productId", products.title, products.price, products.picture
//         FROM "productUnits"
//         JOIN orders
//             ON orders.id = "productUnits"."orderId"
//         JOIN users
//             ON users.id = orders."userId"
//         JOIN products
//             ON products.id = "productUnits"."productId"
//         WHERE "userId".id = ${userId};
//         `);
//         return rows;
//     } catch (error) {
//         console.error(error);
//     }
// }


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
    createProductUnits,
    deleteOrder, 
    getOrderByOrderID,
    getOrderByUserId,
    getProductUnits,
    getOrders
};
