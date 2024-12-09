import express from "express";
import sequelize from "./database.js";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/UserModel.js";
import Course from "./models/CourseModel.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", courseRoutes);
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
	res.send("Hello World!");
});

async function main() {
	try {
    await sequelize.sync();
    console.log("Database synced!");

    // Create test user
    // const user = await User.create({
    //   username: "test",
    //   password: "123",
    // });
    // console.log("Test user created:", user.toJSON());

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log("Available routes:");
      console.log("- GET  /");
      console.log("- GET  /api/courses");
      console.log("- POST /api/login");
      console.log("- POST /api/users");
      console.log("- POST /api/courses");
    });
  } catch (error) {
		console.error("Startup error:", error);
		process.exit(1);
	}
}

main();
