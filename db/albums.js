const { client } = require ('./client');


async function createAlbum ({artist, title, description, price, qty}) {
    console.log('this is the createAlbum func')
    try {
        const { rows: [album] } = await client.query(
            `
            INSERT INTO products(artist, title, description, price, qty)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
            [artist, title, description, price, qty]);
        return album;
        
    } catch (error) {
        console.log('createAlbum func failed');
        console.error(error);
    }
};

module.exports =  {createAlbum};