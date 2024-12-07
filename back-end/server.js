import express from "express";
import { initializeDatabase } from "./config/init.js";
import UserModel from "./model/UserModel.js";
import Course from "./model/CourseModel.js";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/users", validateUser, async (req, res) => {
	try {
		const user = await UserModel.create(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.post("/courses", async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Get all users
app.get("/users", async (req, res) => {
	try {
		const users = await UserModel.findAll();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
	try {
		const user = await UserModel.findByPk(req.params.id);
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Something broke!",
		message: process.env.NODE_ENV === "development" ? err.message : undefined,
	});
});

async function main() {
	await initializeDatabase();

	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
}

main().catch((err) => console.error("Error:", err));
