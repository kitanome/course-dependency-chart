
// import {Strategy as LocalStrategy} from "passport-local";
import dotenv from "dotenv";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
//Load environment variables from .env file
dotenv.config();

//Local Strategy
//Instead of using Google Auth like the demo project,
//we will do authentication using username and password

//If the username and password doesn't exist in DB,
//return callback with an error message, else return callback
//with the user Object

passport.use(
    new LocalStrategy(
        async (username,password, done) => {
            
            let user = await User.findOne({ where: {username}});
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return done(null, false, {message: "Incorrect username or password"})
            };
            return done(null,user);
        }       
    )
)

// These two functions process with session persistence, allowing multiple requests to be made in the session

// SerializeUser serializes user's id and passes it to the done callback.
// The ID is stored in the session and will be used to retrieve the user
// object in subsequent requests.

passport.serializeUser((user, done) => done(null, user.id));

// This function is called to retrieve the user object from the session.
// It deserializes the user's ID and passes it to the done callback. The
// user object is then available in the req.user property in the request
// handler.
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

export default passport;
