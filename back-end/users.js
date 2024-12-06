import express from "express";
import User from "../model/UserModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
