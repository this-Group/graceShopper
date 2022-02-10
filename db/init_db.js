// code to build and initialize DB goes here

const {createAlbum} = require('./albums');
const { client } = require('./client');
const { createUser } = require('./users');

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
      qty INTEGER,
      picture TEXT
      
    );
    `);

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    `);

 console.log('finished building product table')
    // drop tables in correct order

    // build tables in correct order

  } catch (error) {
    console.error(error)
    throw error;
  }
};

async function populateInitialData() {
  console.log('starting to create seed data');
  try {
    // create useful starting data
    
    const albumsToCreate = [
      {artist: 'CHARLIE WORSHAM', title:'SUGARCANE', genre: 'COUNTRY', price: 25, qty: 0, picture: 'https://i.discogs.com/PcogRQkAgjl3T7VgSqow71Oycm8vf_Fbd-xEI2jdtuM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTg3/MDI4MS0xNTIxODgz/Mzg4LTIyMTQuanBl/Zw.jpeg', },
      {artist: 'DAN + SHAY', title:'GOOD THINGS', genre: 'COUNTRY', price: 35, qty: 0},
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

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { username: 'albert', password: 'bertie99' },
      { username: 'sandra', password: 'sandra123' },
      { username: 'glamgal', password: 'glamgal123' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
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
    await createInitialUsers();
    
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  buildTables,
  createInitialUsers
};