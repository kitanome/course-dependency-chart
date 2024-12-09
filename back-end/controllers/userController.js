import User from "../models/UserModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
