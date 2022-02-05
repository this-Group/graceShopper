// code to build and initialize DB goes here
const { client }= require('./index');
const {createAlbum} = require('./albums');
console.log('testing');

// async function dropTables() {
//   console.log('dropping all tables ...');
//   try {
//     client.connect()
//     await client.query(`
//     DROP TABLE IF EXISTS products;
//     `)
    
//   } catch (error) {
//     console.error(error)
    
//   }
// }

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
      {artist: 'CHARLIE WORSHAM', title:'SUGARCANE', description: 'COUNTRY', price: 25, qty: 0},
      {artist: ' DAN + SHAY', title:'GOOD THINGS', description: 'COUNTRY', price: 35, qty: 0},
      {artist: 'MIDLAND', title:'THE LAST RESORT', description: 'COUNTRY', price: 30, qty: 0},
      // {artist: 'MICKEY GUYTON', title:'REMEMBER HER NAME', description: 'COUNTRY', price:26, qty: ''},
      // {artist: 'ELVIE SHANE', title:'BACKSLIDER', description: 'COUNTRY', price: 20, qty: ''},
      // {artist: 'ELVIE SHANE', title:'BACKSLIDER', description: 'COUNTRY', price: 20, qty: ''},
      // {artist: 'MORGAN WADE', title:'RECKLESS', description: 'COUNTRY', price: 28, qty: ''},
      // {artist: 'ALAN JACKSON', title:'WHERE HAVE YOU GONE', description: 'COUNTRY', price: 30, qty: ''},
      // {artist: 'ERIC CHURCH', title:'HEART & SOULD', description: 'COUNTRY', price: 30, qty: ''},
      // {artist: 'MIRANDA LAMBERT, JON RANDALL, JACK INGRAM', title:'THE MARFA TAPES', description: '', price: 26, qty: ''},
      // {artist: 'CARLY PEARCE', title:'29: WRITTEN IN STONE', description: 'COUNTRY', price:28, qty: ''},
      // {artist: 'BILLY STRINGS', title:'RENEWAL', description: 'COUNTRY', price: 29, qty: ''},
      // {artist: 'ZAC BROWN BAND', title:'THE COMEBACK', description: 'COUNTRY', price: 36, qty: ''},
      // {artist: 'ZAC BROWN BAND', title:'HOME GROWN', description: 'COUNTRY', price: 35, qty: ''},
      // {artist: 'LUKE BRYAN', title:'BORN HERE LIVE HERE DIE HERE', description: 'COUNTRY', price: 35, qty: ''},
      // {artist: 'LUKE BRYAN', title:'WHAT MAKES YOU COUNTRY', description: 'COUNTRY', price: 29, qty: ''},
      // {artist: 'KANE BROWN', title:'EXPERIMENT', description: 'COUNTRY', price: 28, qty: ''},
      // {artist: 'LUKE COMBS', title:'DOIN THIS', description: 'COUNTRY', price: 25, qty: ''},
      // {artist: 'WALKER HAYS', title:'COUNTRY STUFF', description: 'COUNTRY', price: 30, qty: ''},
      // {artist: 'THE DOORS', title:'OTHER VOICES', description: 'ROCK', price: 25, qty: ''},
      // {artist: 'THE BEATLES', title:'HELP', description: 'ROCK', price: 30, qty: ''},
      // {artist: 'PINK FLOYD', title:'DARK SIDE OF THE MOON', description: ROCK, price: 26, qty: ''},
      // {artist: 'FLEETWOOD MAC', title:'RUMOURS', description: 'ROCK', price: 25, qty: ''},
      // {artist: 'NIRVANA', title:'IN UTERO', description: 'ROCK', price: 27, qty: ''},
      // {artist: 'RADIOHEAD', title:'KID A', description: 'ROCK', price: 25, qty: ''},
      // {artist: 'BEASTIE BOYS', title:'LICENSED TO ILL', description: 'HIP HOP', price: 30, qty: ''},
      // {artist: 'NAS', title:'ILLMATIC', description: 'HIP HOP', price: 28, qty: ''},
      // {artist: 'GORILLAZ', title:'DEMON DAYS', description: 'HIP HOP', price: 25, qty: ''},
      // {artist: 'JAY Z', title:'THE BLUEPRINT', description: 'HIP HOP', price: 25, qty: ''},
      // {artist: 'MADONNA', title:'TRUE BLUE', description: 'POP', price: 27, qty: ''},
      // {artist: 'MICHAEL JACKSON', title:'THRILLER', description: 'POP', price: 30, qty: ''},
      // {artist: 'PRINCE', title:'PURPLE RAIN', description: 'POP', price: 30, qty: ''},
      // {artist: 'KYLIE MINOGUE', title: "LET'S GET TO IT", description: 'POP', price: 27, qty: ''},
      // {artist: 'SIMON & GARFUNKEL', title:'BOOKENDS', description: 'ROCK', price: 26, qty: ''},
      // {artist: 'BRUCE SPRINGSTEEN', title:'BORN TO RUN', description: 'ROCK', price: 25, qty: ''},
      // {artist: 'QUEEN', title:'QUEEN II', description: 'ROCK', price: 27, qty: ''},
      // {artist: 'U2', title:'WAR', description: 'ROCK', price: 24, qty: ''},
      // {artist: 'NAUGHTY BY NATURE', title:'HIP HOP HOORAY', description: 'HIP HOP', price: 26, qty: ''},
      // {artist: 'QUEEN LATIFAH', title:'ALL HAIL THE QUEEN', description: 'HIP HOP', price: 27, qty: ''},
      // // {artist: '', title:'', description: '', price: '', qty: ''},



    ]
    console.log(albumsToCreate);
    const albums = await Promise.all(albumsToCreate.map(createAlbum))
    console.log('finished creating albums');
    console.log(albums);
  } catch (error) {
    throw error;
  }
}


buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  rebuildDB
};