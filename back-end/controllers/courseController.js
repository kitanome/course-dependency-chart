import Course from "../models/CourseModel.js";

export const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.findAll();
		console.log("Courses fetched:", courses.length);
		res.json(courses);
	} catch (error) {
		console.error("Error fetching courses:", error);
		res.status(500).json({ error: "Failed to fetch courses" });
	}
};

export const createCourse = async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json(course);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
