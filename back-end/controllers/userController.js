import User from "../models/UserModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const factoryResponse = (status, message) => ({ status, message });

const existUser = async(username) => {
	const user = await User.findOne({where: {username}});
	return user;
}

export const createUser = async (req, res) => {
	try {
		const {username, password} =  req.body;
		if (await existUser(userName)){
			return res.status(400).json(factoryResponse(400, "Username already taken"));
		}
		const hash = await bcrypt.hash(password,10);
		await User.create({ username, password: hash});
		res.json(factoryResponse(200, "Registration successful"));
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		console.log("Login attempt:", username);

		const user = await User.findOne({ where: { username } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json(factoryResponse(401, "Invalid credentials"));
		}

		req.login(user, (err) =>
			err ? next(err) : res.json(factoryResponse(200, "Login successful"))
		);
		
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ error: "Failed to login" });
	}
};

export const logout = (req, res) => {
	req.logout(function (err) {
	  if (err) {
		res.json(factoryResponse(500, "Logout failed"));
		return;
	  }
	  res.json(factoryResponse(200, "Logout successful"));
	});
  };
  

export const getProfile = (req,res) => {
	res.json(factoryResponse(200, `Welcome, ${req.user.username}`));
}
