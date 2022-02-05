const {Client} = require('pg');
const DB_NAME = 'music';
const DB_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/music'

const client = new Client(DB_URL);


module.exports = client;