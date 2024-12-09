import express from "express";
import Course from "../model/CourseModel.js";

const router = express.Router();

// Get all courses
router.get("/courses", async (req, res) => {
	try {
		const courses = await Course.findAll();
		console.log("Courses fetched:", courses.length);
		res.json(courses);
	} catch (error) {
		console.error("Error fetching courses:", error);
		res.status(500).json({ error: "Failed to fetch courses" });
	}
});

// Create new course
router.post("/courses", async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
