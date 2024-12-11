import express from "express";
import session from "express-session";
import sequelize from "./database.js";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/UserModel.js";
import Course from "./models/CourseModel.js";
import passport from "./auth/passport.js";
import bcrypt from "bcryptjs";

const app = express();
const port = 3000;

//Configure static files
app.use(express.static("../front-end/"));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setup session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", courseRoutes);
app.use("/api", userRoutes);
// Test route
// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

async function main() {
	try {
    await sequelize.sync();
    console.log("Database synced!");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log("Available routes:");
      console.log("- GET    /");
      console.log("- GET    /api/courses");
      console.log(" -GET    /api/courses/:id/comments");
      console.log("- GET    /api/logout");
      console.log("- GET    /api/profile");
      console.log("- POST   /api/login");
      console.log("- POST   /api/register");
      console.log("- POST   /api/courses");
      console.log(" -POST   /api/courses/:id/comments");
      console.log(" -DELETE /api/courses/:id/comments")
    });
  } catch (error) {
		console.error("Startup error:", error);
		process.exit(1);
	}
}

main();
