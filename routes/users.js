const express = require('express');
const { Router } = require('express');
const userRouter = express.Router();



const {
    createUser,
    loginUser,
    checkForUsername
} = require("../db/users")

//Register or Signup a user



userRouter.post("/signup", async (req, res, next) => {
    res.send(
        { message: 'This is the signup router'}
    )
    const { username, password } = req.body;
    console.log("signup", username, password )

    const checkUsername = await checkForUsername(username);

    console.log("checkUser is", checkUsername )

    if (checkUsername) {
        res.status(401)
        next({
            name: "UsernameTakenError",
            message: "The username is taken"
        });
    } else {

        try {
            const newUser = await createUser(username, password);
            console.log("This is the new user", newUser )
            // if(newUser){
            //     const userToken = jwt.sign({
            //         username,
            //         password,
            //         id: user.id
            //     }, SECRET);

            //     res.status(200).send( {userToken: userToken}, newUser);
            //     localStorage.setItem('token', userToken );
            // }

            res.status(200).send( newUser );
        } catch (error) {
            console.log('the signup post handeler failed');
            return next(error);
        }
    }
});



//Login a user 

userRouter.get("/login", async (req, res, next) => {
    res.send(
        { message: 'This is the login router'}
    )
    // const { username, password } = req.body;

    // const checkUsername = checkForUsername(username),

    // if (!checkUsername) {
    //     res.status(401)
    //     next({
    //         name: "UsernameError",
    //         message: "Invalid User"
    //     });
    // } else {

    //     try {
    //         const user = await loginUser(username, password);

    //         res.status(200).send(user);
    //     } catch (error) {
    //         console.log('the login get handeler failed');
    //         return next(error);
    //     }
    // }
});

module.exports = userRouter;

