const { client } = require("./client");

async function createUser( username, password ) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username, password]);

            return user;

    } catch (error) {
        console.log('createUser function failed');
        console.error(error);
        throw error;
    }
}

async function loginUser( username, password ) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT id 
            FROM users
            WHERE username = $1, password = $2)
            LIMIT 1;
        `, [username, password]);

        return user;

    } catch (error) {
        console.log('getUser function failed');
        console.error(error);
        throw error;
    }
}

async function checkForUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT username 
            FROM users
            WHERE username = $1;
        `, [username]);

        if(user){
            return true;
        }else {
            return false
        }
        

    } catch (error) {
        console.log('checkForUsername function failed');
        console.error(error);
        throw error;
    }
}

module.exports = {
    createUser,
    loginUser,
    checkForUsername
  };