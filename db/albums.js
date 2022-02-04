const client = require ('./client');


const createAlbum = async ({artist, title, description, price, qty}) => {
    try {
        const { rows: [album] } = await client.query(`
            INSERT INTO products(artist, title, description, price, qty)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [artist, title, description, price, qty]);
        return album;
        
    } catch (error) {
        console.log('createAlbum func failed');
        console.error(error);
    }
};