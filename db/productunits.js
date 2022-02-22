const { client } = require ('./client');

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

async function createProductUnitsForTables ({ orderId, productId, price }) {
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

async function createProductUnits ( orderId, productId, price ) {
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

async function deleteProductUnits(id) {
    try {
        const {rows} = await client.query(`
            DELETE FROM "productUnits"
            WHERE id = $1
            RETURNING *;
        `, [id])

        return rows;
    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    createProductUnits,
    getProductUnits,
    deleteProductUnits,
    createProductUnitsForTables
}