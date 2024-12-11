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
		if (await existUser(username)){
			return res.status(400).json({error: 'Username already taken'})
		}
		const hash = await bcrypt.hash(password,10);
		await User.create({ username, password: hash});
		res.status(200).json({message: 'Account successfully created'});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		console.log("Login attempt:", username, password);

		const user = await User.findOne({ where: { username } });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		req.login(user, (err) =>
			err ? next(err) : res.status(200).json({message: "Login Successful"})
		);

	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ error: "Failed to login" });
	}
};

export const logout = (req, res) => {
	req.logout(function (err) {
	  if (err) {
		res.status(500).json({error: "Logout failed"});
		return;
	  }
	  res.status(200).json({message: "Logout successful"});
	});
  };


export const getProfile = (req,res) => {
	res.status(200).json({user: req.user.username});
}
