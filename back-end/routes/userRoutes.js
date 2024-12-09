import express from "express";
import { login, createUser } from "../controllers/userController.js";
import passport from "../auth/passport.js";

const router = express.Router();

// Login route
router.post("/login", login);
// router.post("/login/auth",
//     passport.authenticate('local',{
//         successRedirect:'/',
//         failureRedirect:'/login',
//     })
// )

// Create new user
router.post("/users", createUser);

export default router;
