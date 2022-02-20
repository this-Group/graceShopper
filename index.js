// This is the Web Server
const express = require('express');
const server = express();
// here's our static files
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { client } = require('./db/client');

server.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", false);

  next(); 
})

server.use(morgan('dev'));

server.use(express.json());

server.use(bodyParser.urlencoded({extended: false}));

server.use(express.static(path.join(__dirname, 'build')));

server.use('/api', require('./routes'));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


// here's our API


// by default serve up the react app if we don't recognize the route


// bring in the DB connection




// connect to the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);




  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
