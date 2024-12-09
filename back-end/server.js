import express from "express";
import sequelize from "./database.js";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./model/UserModel.js";
import Course from "./model/CourseModel.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', courseRoutes);
app.use('/api', userRoutes);

// Test route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

async function main() {
	try {
		await sequelize.sync({ force: true });
		console.log("Database synced!");

		// Create test data
		const user = await User.create({
			username: "test",
			password: "123"
		});
		console.log("Test user created:", user.toJSON());

		const course = await Course.create({
			course_id: "CS101",
			name: "Introduction to Computer Science",
			description: "An introductory course to computer science.",
			prerequisites: ["MATH101"],
			corequisites: [],
			credits: 3,
			professors: ["prof123"]
		});
		console.log("Test course created:", course.toJSON());

		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
			console.log('Available routes:');
			console.log('- GET  /');
			console.log('- GET  /api/courses');
			console.log('- POST /api/login');
			console.log('- POST /api/users');
			console.log('- POST /api/courses');
		});
	} catch (error) {
		console.error("Startup error:", error);
		process.exit(1);
	}
}

main();
