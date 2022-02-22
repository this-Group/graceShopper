// code to build and initialize DB goes here

const {createAlbum} = require('./albums');
const { createUserForTables } = require('./users');
const { createOrder, createProductUnits } =require('./orders')
const { client } = require('./client');

console.log('testing');

async function dropTables() {
  console.log("Dropping all tables...");

  try {
    await client.query(`

            DROP TABLE IF EXISTS "productUnits";
            DROP TABLE IF EXISTS orders;
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


 console.log('finished building product table')
    // drop tables in correct order

    // build tables in correct order


    // await client.query(`
    // DROP TABLE IF EXISTS users;
    // `)


    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    `);



    // await client.query(`
    // DROP TABLE IF EXISTS orders;
    // `)


    await client.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) NOT NULL,
      status VARCHAR(255) NOT NULL
    );
    `);


    // await client.query(`
    // DROP TABLE IF EXISTS "productUnits";
    // `)


    await client.query(`
      CREATE TABLE "productUnits"(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        price DECIMAL NOT NULL
      );
    `)

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
      {artist: 'CHARLIE WORSHAM', title:'SUGARCANE', genre: 'COUNTRY', price: 25, qty: 0, picture: 'https://www.charlieworsham.com/sites/g/files/g2000012041/files/2021-06/CW_Sugarcane-FNL_01.jpg'},
      {artist: ' DAN + SHAY', title:'GOOD THINGS', genre: 'COUNTRY', price: 35, qty: 0, picture: 'https://i.discogs.com/eD6eiQSoIsuKWvHaac64MuUGqQ0FcF34kGL-aMgfRvM/rs:fit/g:sm/q:90/h:578/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE5/ODI3NzkwLTE2Mjkz/MDI4NzktODMzNy5q/cGVn.jpeg'},
      {artist: 'MIDLAND', title:'THE LAST RESORT', genre: 'COUNTRY', price: 30, qty: 0, picture: 'https://i.discogs.com/ewzP3mRAVcJdO7WG6hMHeG0mwqxtFTN7GjyFS3lkw-U/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE5/NTc3MjY2LTE2MjY5/MDM1MDEtNTQ5NS5q/cGVn.jpeg'},
      {artist: 'MICKEY GUYTON', title:'REMEMBER HER NAME', genre: 'COUNTRY', price:26, qty: 0, picture: 'https://i.discogs.com/5jf-tItDRMFpYEjBpWEjGwinUpElVrj6au-_WVcFiEA/rs:fit/g:sm/q:90/h:425/w:425/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE5/NDc5NjY3LTE2MjYx/OTU4NzktNzQ4Mi5q/cGVn.jpeg'},
      {artist: 'ELVIE SHANE', title:'BACKSLIDER', genre: 'COUNTRY', price: 20, qty: 0, picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F11%2F02%2Felvie-shane-3.jpg'},
      {artist: 'MORGAN WADE', title:'RECKLESS', genre: 'COUNTRY', price: 28, qty: 0, picture: 'https://i.discogs.com/9YK5JXUVplo0VGcpfnnSiyJL6bMhFz_xb-vSnZSu_bg/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE4/MDMzNjY0LTE2MTY4/NTU5MzctNTUxOS5q/cGVn.jpeg'},
      {artist: 'ALAN JACKSON', title:'WHERE HAVE YOU GONE', genre: 'COUNTRY', price: 30, qty: 0, picture: 'https://i.discogs.com/UiRVZoDSQNYCoYCqjhxjayV8J0lxfxMESsYTn0WQrEM/rs:fit/g:sm/q:90/h:582/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTIw/MzA2MDU2LTE2MzIx/NjEyMTgtODEyNC5q/cGVn.jpeg'},
      {artist: 'ERIC CHURCH', title:'HEART & SOUL', genre: 'COUNTRY', price: 30, qty: 0, picture: 'https://i.discogs.com/Yh7fX65u3fcQDS5a13PZBiiwNtvv7Hh_S6a1bH8ASAw/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE4/MzI4MDcyLTE2MTkz/NTE0OTItMTAyOC5q/cGVn.jpeg'},
      {artist: 'MIRANDA LAMBERT, JON RANDALL, JACK INGRAM', title:'THE MARFA TAPES', genre: 'COUNTRY', price: 26, qty: 0, picture: 'https://i.discogs.com/3XamPOdJ710S6UQ7mAq-nWb8-bEvSKhSCcKcPTmbquE/rs:fit/g:sm/q:90/h:587/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE4/NjQ1NTU2LTE2MjA0/OTgxNDEtNDA4My5q/cGVn.jpeg'},
      {artist: 'CARLY PEARCE', title:'29: WRITTEN IN STONE', genre: 'COUNTRY', price:28, qty: 0, picture: 'https://i.discogs.com/YWlKD16Xh-MuwWCo3371ATncP1MMezwvOq9Y0IWUUJI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTIw/Mjc3MDc2LTE2MzE5/ODAyMzUtMTYyOS5q/cGVn.jpeg'},
      {artist: 'BILLY STRINGS', title:'RENEWAL', genre: 'COUNTRY', price: 29, qty: 0, picture: 'https://i.discogs.com/8v4irBgTYd6ZpWR5Mu1HA41qSNZxGbJOVH_68uSuBII/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTIw/MzU5MTA4LTE2MzI1/NDAxMjctNzk3My5q/cGVn.jpeg'},
      {artist: 'ZAC BROWN BAND', title:'THE COMEBACK', genre: 'COUNTRY', price: 36, qty: 0, picture: 'https://i.discogs.com/cWby0hbTNvKFGCJP7JOwEXTKL6NQbQMYnPrTvJpkP34/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTIw/NjIyNjE2LTE2MzQ3/Mzg5NTItNzQwNy5q/cGVn.jpeg'},
      {artist: 'ZAC BROWN BAND', title:'THE FOUNDATION', genre: 'COUNTRY', price: 35, qty: 0, picture: 'https://i.discogs.com/TIQVpg-goLlFQyf7F1Rk4JhdYssCRgUUrncnbsEEp44/rs:fit/g:sm/q:90/h:531/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE4/MTQzNDYtMTQzNDky/NjUzNC01NzM0Lmpw/ZWc.jpeg'},
      {artist: 'LUKE BRYAN', title:'BORN HERE LIVE HERE DIE HERE', genre: 'COUNTRY', price: 35, qty: 0, picture: 'https://i.discogs.com/1LOF7Rov2-D4-QLzj7doWuqcltoiEVPkxm6JTONmomo/rs:fit/g:sm/q:90/h:597/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE1/NzI2MjEwLTE2MDc2/OTA3NDUtNDI4NC5q/cGVn.jpeg'},
      {artist: 'LUKE BRYAN', title:'WHAT MAKES YOU COUNTRY', genre: 'COUNTRY', price: 29, qty: 0, picture: 'https://i.discogs.com/Cqv3hntIDJ6EJuwEcusN2k4Je9g9Ilx4EH95ixGwPIQ/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTEx/MjQzMTU0LTE1MTQz/OTgxODQtMTkyOC5q/cGVn.jpeg'},
      {artist: 'KANE BROWN', title:'EXPERIMENT', genre: 'COUNTRY', price: 28, qty: 0, picture: 'https://i.discogs.com/TUwxfvYwe6RaG9IJWQae0F8Iyy5nfX0UER20T40csn8/rs:fit/g:sm/q:90/h:530/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTEy/NzY2NTQxLTE1NDE1/MzM1NTAtNTM5Mi5q/cGVn.jpeg'},
      {artist: 'LUKE COMBS', title:'DOIN THIS', genre: 'COUNTRY', price: 25, qty: 0, picture: 'https://i.discogs.com/cSndkNCJevaVDPyw-eU_-SinpmKv8gCU-FU5Y0dgIKA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTIw/OTM1ODMxLTE2MzY2/MzgxMDYtNjYwOS5q/cGVn.jpeg'},
      {artist: 'WALKER HAYS', title:'COUNTRY STUFF', genre: 'COUNTRY', price: 30, qty: 0, picture: 'https://i.discogs.com/qQggn9ulM4rRS9IoL9JTpfch_EJjYFXaRTbHvgWgJHU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTIx/ODI3MTcwLTE2NDI3/Njg2NTgtNTI1NC5q/cGVn.jpeg'},
      {artist: 'THE DOORS', title:'OTHER VOICES', genre: 'ROCK', price: 25, qty: 0, picture: 'https://i.discogs.com/PcogRQkAgjl3T7VgSqow71Oycm8vf_Fbd-xEI2jdtuM/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTg3/MDI4MS0xNTIxODgz/Mzg4LTIyMTQuanBl/Zw.jpeg'},
      {artist: 'THE BEATLES', title:'HELP', genre: 'ROCK', price: 30, qty: 0, picture: 'https://i.discogs.com/hqeWl_cLNFyAw4Jg88OjYIMC6xKZlQXRwEbLf3p0LKE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTcz/NTU2NC0xNjIyMDU0/OTY0LTE3MjkuanBl/Zw.jpeg'},
      {artist: 'PINK FLOYD', title:'DARK SIDE OF THE MOON', genre: 'ROCK', price: 26, qty: 0, picture: 'https://i.discogs.com/a83kEz4TQ96doO05Y5f5_GD90LluhUqFqk57xCUwasg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE4/NzMwMTMtMTQ3MTEw/MDM4MS0zMDIyLmpw/ZWc.jpeg'},
      {artist: 'FLEETWOOD MAC', title:'RUMOURS', genre: 'ROCK', price: 25, qty: 0, picture: 'https://i.discogs.com/h4R7GiSXOkFC99UW9S2_NXtWVlU4k-y6hyg__QfkmGk/rs:fit/g:sm/q:90/h:598/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTcz/MjQ0MzQtMTQzOTA5/NDM4OC0zNDk3Lmpw/ZWc.jpeg'},
      {artist: 'NIRVANA', title:'IN UTERO', genre: 'ROCK', price: 27, qty: 0, picture: 'https://i.discogs.com/pM5TfYv2TBQAaD7Lmc7HcDTJ1MxVo9AmLiv36l47KNk/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTM3/NTk3OS0xNDkxNzAw/MzQ3LTcyNjMuanBl/Zw.jpeg'},
      {artist: 'RADIOHEAD', title:'KID A', genre: 'ROCK', price: 25, qty: 0, picture: 'https://i.discogs.com/ndHYJdj-CAK4-nu7G-Mc-0XtA7fe1IDKGR6kkOigaEw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTc0/NzQzLTE1NDg5MDI2/NDMtMzg2OS5qcGVn.jpeg'},
      {artist: 'BEASTIE BOYS', title:'LICENSED TO ILL', genre: 'HIP HOP', price: 30, qty: 0, picture: 'https://i.discogs.com/PSMXrrq9oJgbpAKnOpez6GoYXtU-yGUh94dZhWVuA6o/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTU1/MzE3NTUtMTM5NTky/MDkwNi03MjkyLmpw/ZWc.jpeg'},
      {artist: 'NAS', title:'ILLMATIC', genre: 'HIP HOP', price: 28, qty: 0, picture: 'https://i.discogs.com/Au8Ooqv-kOgC9ywrB2U8UkPhhWi7ic_VC9MGY2cdLX0/rs:fit/g:sm/q:90/h:490/w:500/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTM5/MjYwNC0xMTc3MDE5/MjI4LmpwZWc.jpeg'},
      {artist: 'GORILLAZ', title:'DEMON DAYS', genre: 'HIP HOP', price: 25, qty: 0, picture: 'https://i.discogs.com/wh9GQU9jOZkhGqGYGY-ti2HszCp9AAVXQGn69ZRxBoQ/rs:fit/g:sm/q:90/h:400/w:394/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTQ3/NDcwMy0xNDU3Mjk0/MjE2LTM5NjUuanBl/Zw.jpeg'},
      {artist: 'JAY Z', title:'THE BLUEPRINT', genre: 'HIP HOP', price: 25, qty: 0, picture: 'https://i.discogs.com/ndJGLm9ZvD3l77cdkRI-QM1y7uVPhY5Gl7pK3IEMt6Y/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTI1/MTg5NC0xNTAxMzc1/NjUyLTEwMzUuanBl/Zw.jpeg'},
      {artist: 'MADONNA', title:'TRUE BLUE', genre: 'POP', price: 27, qty: 0, picture: 'https://i.discogs.com/67N7WcLKooElcAU9XhoPR5J5JyMV57F1NArB1DpZ-Io/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTU5/NzIyMi0xNDE4ODg2/Mzg0LTQzMzUuanBl/Zw.jpeg'},
      {artist: 'MICHAEL JACKSON', title:'THRILLER', genre: 'POP', price: 30, qty: 0, picture: 'https://i.discogs.com/37PaoYVBfBebblA9SK25JM4xAJwi-rz6gc6HLJie78s/rs:fit/g:sm/q:90/h:602/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTI5/MTEyOTMtMTU5NDI0/NTgxMi03OTMxLmpw/ZWc.jpeg'},
      {artist: 'PRINCE', title:'PURPLE RAIN', genre: 'POP', price: 30, qty: 0, picture: 'https://i.discogs.com/HIMk_VHS2xwiirwCJ2Ehl-0Ow10_RlB5vUFr529hih4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTE5/NDAyMS0xMzM1NDAw/Mjg5LmpwZWc.jpeg'},
      {artist: 'KYLIE MINOGUE', title: "LET'S GET TO IT", genre: 'POP', price: 27, qty: 0, picture: 'https://i.discogs.com/CdPjmevj8RSa5IMJ1TcCTTE-E02h1ksM8XOrRb9cgRA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTg3/MDA1NzItMTUxODA0/MzM4MS03MTc5Lmpw/ZWc.jpeg'},
      {artist: 'SIMON & GARFUNKEL', title:'BOOKENDS', genre: 'ROCK', price: 26, qty: 0, picture: 'https://i.discogs.com/UIHjgncSG_3ptCxjZ84-JL2UOtuau8SYak60L9JQGlU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTcw/NzkzMC0xNDk1NDM5/Mjc4LTc3MjAuanBl/Zw.jpeg'},
      {artist: 'BRUCE SPRINGSTEEN', title:'BORN TO RUN', genre: 'ROCK', price: 25, qty: 0, picture: 'https://i.discogs.com/O1rYeuc6WlZBIUxo7ycyVyUA6eUdH2Ly1VvHfOHzON4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTEy/Mjc5NDEyLTE2MTA3/MjMxOTUtNjM2MC5q/cGVn.jpeg'},
      {artist: 'QUEEN', title:'QUEEN II', genre: 'ROCK', price: 27, qty: 0, picture: 'https://i.discogs.com/M8F7KXhNRNgcp3IyvAYd0zZnhTRoNf7TyVG_f1NeEnU/rs:fit/g:sm/q:90/h:601/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTc0/OTkzNTQtMTQ0Mjc0/ODAwNy01NTczLmpw/ZWc.jpeg'},
      {artist: 'U2', title:'WAR', genre: 'ROCK', price: 24, qty: 0, picture: 'https://i.discogs.com/_YQthdq93TfKyEnbz4XLQEshbvbGOuBtTN1_g-VFcEk/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTc4/NjE2MS0xNjE3Mzc4/Njk3LTM0MDUuanBl/Zw.jpeg'},
      {artist: 'NAUGHTY BY NATURE', title:'HIP HOP HOORAY', genre: 'HIP HOP', price: 26, qty: 0, picture: 'https://i.discogs.com/Ji-HVxgpb0m8VSg-mlt74t8ARADd9NzZTyB5yHZZWQs/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTI5/MjM0MjEtMTMwNzQ4/NDM4Ny5qcGVn.jpeg'},
      {artist: 'QUEEN LATIFAH', title:'ALL HAIL THE QUEEN', genre: 'HIP HOP', price: 27, qty: 0, picture: 'https://i.discogs.com/_-d53CfFHRqV4H6mQNhdBBiCJi6X7A243xH3piEkaLs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWltYWdlcy9SLTQz/OTMxNi0xMzA2MTIz/MjAzLmpwZWc.jpeg'},
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
    const users = await Promise.all(usersToCreate.map(createUserForTables));

    console.log('Users created:', users);
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialOrders() {
  console.log('Starting to create orders...');
  try {

    const ordersToCreate = [
      {userId: 1, status: "In Cart"},
      {userId: 2, status: "In Cart"},
      {userId: 3, status: "In Cart"},
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder));

    console.log('Orders created:');
    console.log(orders);
    console.log('Finished creating orders!');
  } catch (error) {
    console.error('Error creating orders!');
    throw error;
  }
}

async function createInitialProductUnits() {
  console.log('Starting to create orders...');
  try {

    const pruductUnitsToCreate = [
      {orderId: 1, productId: 15, price: 29.00},
      {orderId: 1, productId: 27, price: 25.00},
      {orderId: 2, productId: 5, price: 20.00},
      {orderId: 3, productId: 31, price: 30.00},
    ]
    const productUnits = await Promise.all(pruductUnitsToCreate.map(createProductUnits));

    console.log('ProductUnits created:');
    console.log(productUnits);
    console.log('Finished creating ProductUnits!');
  } catch (error) {
    console.error('Error creating ProductUnits!');
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
    await createInitialOrders();
    await createInitialProductUnits();
    
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  buildTables
};