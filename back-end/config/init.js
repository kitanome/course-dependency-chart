import sequelize from "../database.js";
import User from "./model/UserModel.js";
import Course from "../model/CourseModel.js";
import sequelize from "./database.js";

export async function initializeDatabase() {
	await sequelize.sync({ force: true });
	console.log("Database synced!");

	await createSampleData();
}

async function createSampleData() {
	const user = await User.create({
		username: "testuser",
		password: "password123",
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
}
