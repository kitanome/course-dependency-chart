import fs from "fs";
import path from "path";
import sequelize from "./database.js";
import Course from "./models/CourseModel.js";
import User from "./models/UserModel.js";
import bcrypt from "bcryptjs";

async function loadData() {
  try {
    // Sync the database
    await sequelize.sync({ force: true });
    console.log("Database synced.");

    // Use `fs` to read the JSON file
    const filePath = path.resolve(
      "./scraper_scripts/uptodate_courses_s25_only.json"
    );
    const jsonData = fs.readFileSync(filePath, "utf-8"); // Read file content
    const courses = JSON.parse(jsonData); // Parse JSON into JavaScript array
    console.log(courses);
    //Insert data into the User table
    const pass = await bcrypt.hash('123',10);
    await User.create({
      username:'test',
      password:pass,
    })

    // Insert data into the Course table
    await Course.bulkCreate(courses, { validate: true });
    console.log("Data loaded successfully!");
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

loadData();
