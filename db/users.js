const { client } = require("./client");
const {createOrder, userCheckForInCart} = require("./orders")


async function createUserForTables( {username, password} ) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username, password]);

            

            return user;
        

    } catch (error) {
        console.log('createUser For Tables function failed');
        console.error(error);
        throw error;
    }
}
async function createUser( username, password ) {
    console.log("username and password", username, password)
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username, password]);

        const cartStatus = 'In Cart'

        console.log("this is the user", user)

        const newOrder = await createOrder( user.id, cartStatus );
        console.log("Create order function at createUser func", newOrder )

            return user;
        


    } catch (error) {
        console.log('createUser function failed');
        console.error(error);
        throw error;
    }
}

//Should this be SELECT * indstead of just id so it returns the full user?
async function loginUser( username, password ) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM users
            WHERE username = $1 AND password = $2
            LIMIT 1;
        `, [username, password]);

        const user = rows[0]

        console.log("this is user from login func", user)

        const cartStatus = "In Cart"

        const inCartCheck = await userCheckForInCart(user.id, cartStatus )

        console.log("inCartCheck is", inCartCheck)

        if (inCartCheck == false){
            const newOrder = await createOrder( user.id, cartStatus );
            console.log("Create order function at createUser func", newOrder )

        }

        if (!user) return null; 

        return user

        // const doesPasswordsMatch = compare(password, currentUser.password);
        // console.log('the passwords match:', doesPasswordsMatch)

        // if (doesPasswordsMatch) return currentUser ; 

        return null
        

    } catch (error) {
        console.log('loginUser function failed');
        console.error(error);
        throw error;
    }
}

async function checkForUsername(username) {
    console.log("checking", username)
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

// async function getUserByUsername(username) {
//     try {
//         const {rows: [user] } = await client.query(`
//             SELECT * 
//             FROM users
//             WHERE username = $1
//             RETURNING *;
//         `, [username]);

//         return {
//             "id": user.id,
//             "username": user.username
//         }
//     } catch (error) {
//         console.log('getUserById function failed');
//         console.error(error);
//     }
// }

module.exports = {
    createUser,
    loginUser,
    checkForUsername,
    createUserForTables
    // getUserByUsername
  };