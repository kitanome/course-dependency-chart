import Course from "../models/CourseModel.js";

export const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.findAll();
		//console.log("Courses fetched:", courses.length);
		res.status(200).json(courses);
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

export const fetchComments = async (req, res) => {
  try {
    const recoveredCourseId = req.params.id.replace(/_/g, " ");
    console.log("Recovered course ID:", recoveredCourseId);
    const course = await Course.findByPk(recoveredCourseId);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    const comments = await course.getComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

//create new comment if no comment exists, else add to existing comments
/*
 * recoveredCourseId: string - the course id with underscores replaced with spaces
 */
export const createComment = async (req, res) => {
  try {
    const recoveredCourseId = req.params.sanitized_id.replace(/_/g, " ");
    const course = await Course.findByPk(recoveredCourseId);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }
    console.log("Course found:", course);
    // Parse the existing comments JSON string
    const comments = JSON.parse(course.comments || "[]");

    // Add the new comment to the array
    comments.push(req.body);

    // Convert the comments array back to a JSON string
    course.comments = JSON.stringify(comments);

    // Save the updated course
    await course.save();

    res.status(201).json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
