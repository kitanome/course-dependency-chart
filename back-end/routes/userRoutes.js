import express from "express";
import { login, createUser, getProfile } from "../controllers/userController.js";
import {isAuthenticated} from "../auth/middleware.js"
const router = express.Router();

// Login route
router.post("/login", login);

// Create new user
router.post("/users", createUser);
router.get("/profile",isAuthenticated,getProfile)

export default router;
