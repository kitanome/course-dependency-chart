import express from "express";
import {
	getAllCourses,
	createCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// Get all courses
router.get("/courses", getAllCourses);

// Create new course
router.post("/courses", createCourse);

export default router;
