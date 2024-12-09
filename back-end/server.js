import express from "express";
import sequelize from "./database.js";
import User from "./model/UserModel.js";
import Course from "./model/CourseModel.js";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Course route
app.get("/api/courses", async (req, res) => {
	try {
		const courses = await Course.findAll();
		console.log("Courses fetched:", courses.length);
		res.json(courses);
	} catch (error) {
		console.error("Error fetching courses:", error);
		res.status(500).json({ error: "Failed to fetch courses" });
	}
});

// Login route
app.post("/api/login", async (req, res) => {
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
		res.status(500).json({ error: "Failed to login" });
	}
});

app.post("/users", async (req, res) => {
	try {
		const user = await User.create(req.body);
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

async function main() {
	await sequelize.sync({ force: true }); // This will drop the tables if they already exist
	console.log("Database synced!");

	// Create a sample user
	const user = await User.create({
		username: "test",
		password: "123",
	});

	console.log("User created:", user.toJSON());

	// Create a sample course
	const course = await Course.create({
		course_id: "CS101",
		name: "Introduction to Computer Science",
		description: "An introductory course to computer science.",
		prerequisites: ["MATH101"],
		corequisites: [],
		credits: 3,
		professors: ["prof123"],
	});

	console.log("Course created:", course.toJSON());

	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
}

main().catch((err) => console.error("Error:", err));
