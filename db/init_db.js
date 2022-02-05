// code to build and initialize DB goes here

const {createAlbum} = require('./albums');
const { client } = require('./client');

console.log('testing');

async function dropTables() {
  console.log("Dropping all tables...");

  try {
    await client.query(`
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}


async function buildTables() {
  try {
    client.connect()
    await client.query(`
    DROP TABLE IF EXISTS products;
    `)
    console.log('starting to build tables')
    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      artist VARCHAR(255) NOT NULL,
      title VARCHAR(255) UNIQUE NOT NULL,
      genre VARCHAR(255) NOT NULL,
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
      {artist: 'CHARLIE WORSHAM', title:'SUGARCANE', genre: 'COUNTRY', price: 25, qty: 0},
      {artist: ' DAN + SHAY', title:'GOOD THINGS', genre: 'COUNTRY', price: 35, qty: 0},
      {artist: 'MIDLAND', title:'THE LAST RESORT', genre: 'COUNTRY', price: 30, qty: 0},
      {artist: 'MICKEY GUYTON', title:'REMEMBER HER NAME', genre: 'COUNTRY', price:26, qty: 0},
      {artist: 'ELVIE SHANE', title:'BACKSLIDER', genre: 'COUNTRY', price: 20, qty: 0},
      {artist: 'ELVIE SHANE', title:'BACKSLIDER', genre: 'COUNTRY', price: 20, qty: 0},
      {artist: 'MORGAN WADE', title:'RECKLESS', genre: 'COUNTRY', price: 28, qty: 0},
      {artist: 'ALAN JACKSON', title:'WHERE HAVE YOU GONE', genre: 'COUNTRY', price: 30, qty: 0},
      {artist: 'ERIC CHURCH', title:'HEART & SOULD', genre: 'COUNTRY', price: 30, qty: 0},
      {artist: 'MIRANDA LAMBERT, JON RANDALL, JACK INGRAM', title:'THE MARFA TAPES', genre: 'COUNTRY', price: 26, qty: 0},
      {artist: 'CARLY PEARCE', title:'29: WRITTEN IN STONE', genre: 'COUNTRY', price:28, qty: 0},
      {artist: 'BILLY STRINGS', title:'RENEWAL', genre: 'COUNTRY', price: 29, qty: 0},
      {artist: 'ZAC BROWN BAND', title:'THE COMEBACK', genre: 'COUNTRY', price: 36, qty: 0},
      {artist: 'ZAC BROWN BAND', title:'HOME GROWN', genre: 'COUNTRY', price: 35, qty: 0},
      {artist: 'LUKE BRYAN', title:'BORN HERE LIVE HERE DIE HERE', genre: 'COUNTRY', price: 35, qty: 0},
      {artist: 'LUKE BRYAN', title:'WHAT MAKES YOU COUNTRY', genre: 'COUNTRY', price: 29, qty: 0},
      {artist: 'KANE BROWN', title:'EXPERIMENT', genre: 'COUNTRY', price: 28, qty: 0},
      {artist: 'LUKE COMBS', title:'DOIN THIS', genre: 'COUNTRY', price: 25, qty: 0},
      {artist: 'WALKER HAYS', title:'COUNTRY STUFF', genre: 'COUNTRY', price: 30, qty: 0},
      {artist: 'THE DOORS', title:'OTHER VOICES', genre: 'ROCK', price: 25, qty: 0},
      {artist: 'THE BEATLES', title:'HELP', genre: 'ROCK', price: 30, qty: 0},
      {artist: 'PINK FLOYD', title:'DARK SIDE OF THE MOON', genre: 'ROCK', price: 26, qty: 0},
      {artist: 'FLEETWOOD MAC', title:'RUMOURS', genre: 'ROCK', price: 25, qty: 0},
      {artist: 'NIRVANA', title:'IN UTERO', genre: 'ROCK', price: 27, qty: 0},
      {artist: 'RADIOHEAD', title:'KID A', genre: 'ROCK', price: 25, qty: 0},
      {artist: 'BEASTIE BOYS', title:'LICENSED TO ILL', genre: 'HIP HOP', price: 30, qty: 0},
      {artist: 'NAS', title:'ILLMATIC', genre: 'HIP HOP', price: 28, qty: 0},
      {artist: 'GORILLAZ', title:'DEMON DAYS', genre: 'HIP HOP', price: 25, qty: 0},
      {artist: 'JAY Z', title:'THE BLUEPRINT', genre: 'HIP HOP', price: 25, qty: 0},
      {artist: 'MADONNA', title:'TRUE BLUE', genre: 'POP', price: 27, qty: 0},
      {artist: 'MICHAEL JACKSON', title:'THRILLER', genre: 'POP', price: 30, qty: 0},
      {artist: 'PRINCE', title:'PURPLE RAIN', genre: 'POP', price: 30, qty: 0},
      {artist: 'KYLIE MINOGUE', title: "LET'S GET TO IT", genre: 'POP', price: 27, qty: 0},
      {artist: 'SIMON & GARFUNKEL', title:'BOOKENDS', genre: 'ROCK', price: 26, qty: 0},
      {artist: 'BRUCE SPRINGSTEEN', title:'BORN TO RUN', genre: 'ROCK', price: 25, qty: 0},
      {artist: 'QUEEN', title:'QUEEN II', genre: 'ROCK', price: 27, qty: 0},
      {artist: 'U2', title:'WAR', genre: 'ROCK', price: 24, qty: 0},
      {artist: 'NAUGHTY BY NATURE', title:'HIP HOP HOORAY', genre: 'HIP HOP', price: 26, qty: 0},
      {artist: 'QUEEN LATIFAH', title:'ALL HAIL THE QUEEN', genre: 'HIP HOP', price: 27, qty: 0},
      // {artist: '', title:'', genre: '', price: '', qty: ''},



    ]
    console.log(albumsToCreate);
    const albums = await Promise.all(albumsToCreate.map(createAlbum))
    console.log('finished creating albums');
    console.log(albums);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    console.log('this is the rebuildDB func');
    client.connect();

    await dropTables();
    await buildTables();
    await populateInitialData();
    
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  buildTables
};