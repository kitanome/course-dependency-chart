import express from "express";
import { login, createUser } from "../controllers/userController.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Create new user
router.post("/users", createUser);

export default router;
