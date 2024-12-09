import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import dotenv from "dotenv";
import User from "../model/UserModel.js";
//Load environment variables from .env file
dotenv.config();

//Local Strategy
//Instead of using Google Auth like the demo project,
//we will do authentication using username and password

//If the username and password doesn't exist in DB,
//return callback with an error message, else return callback
//with the user Object

// passport.use(
//     new LocalStrategy(
//         async (username,password, done) => {
//             let user = await User.findOne({ where: {username,password}});
//             if (!user) {
//                 return done(null, false, {message: "Incorrect username or password"})
//             };
//             return done(null,user);
//         }       
//     )
// )

// These two functions process with session persistence, allowing multiple requests to be made in the session

// SerializeUser serializes user's id and passes it to the done callback.
// The ID is stored in the session and will be used to retrieve the user
// object in subsequent requests.

passport.serializeUser((user, done) =>{
    //process.nextTick executes this done callback on the next "tick"
    done(null, user.id);
});

//DeserializeUser retrieves the user object from the session, deserialize
//the user's ID and passes it to the done callback. This object is then
//available in req.user property in the request handler

passport.deserializeUser(async (id, done) => {
        const user = await User.findByPk(id);
        done (null, user);

});

export default passport;
