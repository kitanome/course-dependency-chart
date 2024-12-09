import sequelize from "./database.js";
import Course from "./models/CourseModel.js";
import { fileURLToPath, pathToFileURL } from "url";

async function loadData() {
  try {
    // Sync database (creates the Course table if it doesn't exist)
    await sequelize.sync({ force: true }); // WARNING: force: true drops existing tables
    console.log("Database synced.");

    // Convert relative path to file URL
    const filePath = pathToFileURL(
      "./scraper_scripts/uptodate_courses_s25_only.json"
    );

    // Fetch JSON data
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
    }
    const courses = await response.json();
    console.log("Data fetched and parsed.");

    // Insert data into the Course table
    await Course.bulkCreate(courses);
    console.log("Data loaded successfully!");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

loadData();
