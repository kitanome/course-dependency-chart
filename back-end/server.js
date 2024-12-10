import express from "express";
import sequelize from "./database.js";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/UserModel.js";
import Course from "./models/CourseModel.js";
import { Sequelize } from "sequelize";
import passport from "./auth/passport.js";
import bcrypt from "bcryptjs";

const app = express();
const port = 3000;

//Configure static files
app.use(express.static("../front-end/"));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Configure session management.
//This is required to persist login session across requests
//Session data is current stored in memory by default, but we could store
//it in a database or a cache for better scalability

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

//Initialize Passport and restore auth state from session.
//This allows you to keep a user's authentication state across requests
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api", courseRoutes);
app.use("/api", userRoutes);

// Test route
// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

//Use routes from routes.js
// app.use("/",routes);

//Use routes from routes.js
// app.use("/",routes);

async function main() {
	try {
		await sequelize.sync({ force: true });
		console.log("Database synced!");
		const password = await bcrypt.hash("123",10);

		// Create test data
		const user = await User.create({
			username: "test",
			password: password,
		});
		console.log("Test user created:", user.toJSON());

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
