import express from "express";
import User from "../model/UserModel.js";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		console.log("Login attempt:", username);

		const user = await User.findOne({ where: { username, password } });
		if (user) {
			res.json({ message: "Login successful", user });
		} else {
			res.status(401).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Failed to login" });
	}
});

// Create new user
router.post("/users", async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
