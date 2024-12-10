import express from "express";
import { login, logout,createUser, getProfile } from "../controllers/userController.js";
import {isAuthenticated} from "../auth/middleware.js"
const router = express.Router();

// Login/logout route
router.post("/login", login);
router.get("/logout", logout);

// Create new user
router.post("/register", createUser);

//Check if user is currently in a session
router.get("/profile",isAuthenticated,getProfile)

export default router;
