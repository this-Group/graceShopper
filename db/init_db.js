// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function dropTables() {
  console.log('dropping all tables ...');
  try {
    await client.query(`
    
    DROP TABLE IF EXISTS products;
    `)
    
  } catch (error) {
    console.error(error)
    
  }
}

async function buildTables() {
  try {
    await client.connect(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price DECIMAL,
      qty INTEGER
    );
`);
 console.log('finished building product table')
    // drop tables in correct order

    // build tables in correct order

  } catch (error) {
    console.error("error with products table")
    throw error;
  }
};

async function populateInitialData() {
  try {
    // create useful starting data
    const albumsToCreate = [
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      {title:'', description: '', price: '', qty: ''},
      
    ]
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());