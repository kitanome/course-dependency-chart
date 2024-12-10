import express from "express";
import { login, createUser, getProfile } from "../controllers/userController.js";
import passport from "../auth/passport.js";
import {isAuthenticated} from "../auth/middleware.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Create new user
router.post("/users", createUser);

//Protected route
//Auth checking route: If the user is authenticated, stop showing the login screen
router.post("/profile",isAuthenticated,getProfile)

export default router;
