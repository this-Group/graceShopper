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
      artist VARCHAR(255) NOT NULL,
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
  console.log('starting to create seed data');
  try {
    // create useful starting data
    
    const albumsToCreate = [
      {artist: 'CHARLIE WORSHAM', title:'SUGARCANE', description: 'COUNTRY', price: '', qty: ''},
      {artist: ' DAN + SHAY', title:'GOOD THINGS', description: 'COUNTRY', price: '', qty: ''},
      {artist: 'MIDLAND', title:'THE LAST RESORT', description: 'COUNTRY', price: '', qty: ''},
      {artist: 'MICKEY GUYTON', title:'REMEMBER HER NAME', description: 'COUNTRY', price: '', qty: ''},
      {artist: 'ELVIE SHANE', title:'BACKSLIDER', description: '', price: '', qty: ''},
      {artist: 'MORGAN WADE', title:'RECKLESS', description: '', price: '', qty: ''},
      {artist: 'ALAN JACKSON', title:'WHERE HAVE YOU GONE', description: '', price: '', qty: ''},
      {artist: 'ERIC CHURCH', title:'HEART & SOULD', description: '', price: '', qty: ''},
      {artist: 'MIRANDA LAMBERT, JON RANDALL, JACK INGRAM', title:'THE MARFA TAPES', description: '', price: '', qty: ''},
      {artist: 'CARLY PEARCE', title:'29: WRITTEN IN STONE', description: '', price: '', qty: ''},
      {artist: 'BILLY STRINGS', title:'RENEWAL', description: '', price: '', qty: ''},
      {artist: 'ZAC BROWN BAND', title:'THE COMEBACK', description: '', price: '', qty: ''},
      {artist: 'ZAC BROWN BAND', title:'HOME GROWN', description: '', price: '', qty: ''},
      {artist: 'LUKE BRYAN', title:'BORN HERE LIVE HERE DIE HERE', description: '', price: '', qty: ''},
      {artist: 'LUKE BRYAN', title:'WHAT MAKES YOU COUNTRY', description: '', price: '', qty: ''},
      {artist: 'KANE BROWN', title:'EXPERIMENT', description: '', price: '', qty: ''},
      {artist: 'LUKE COMBS', title:'DOIN THIS', description: '', price: '', qty: ''},
      {artist: 'WALKER HAYS', title:'COUNTRY STUFF', description: '', price: '', qty: ''},


    ]
    // const albums = await Promise.all(albumsToCreate.map())
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await populateInitialData();

  } catch (error) {
    console.log("error during rebuildDB")
  }
}

module.exports = {
  rebuildDB
};
// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());