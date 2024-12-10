import express from "express";
import {
  getAllCourses,
  createCourse,
  fetchComments,
  createComment,
} from "../controllers/courseController.js";

const router = express.Router();

// Get all courses
router.get("/courses", getAllCourses);

// Create new course
router.post("/courses", createCourse);

// Get comments for a course
// ! (note that the course ID is underscored instead of spaced)
router.get("/courses/:id/comments", fetchComments);

// Create new comment for a course
router.post("/courses/:id/comments", createComment);

export default router;
