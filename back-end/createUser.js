import sequelize from "./database.js";

import User from "./models/UserModel.js";
import bcrypt from "bcryptjs";

async function createUser() {
  await sequelize.sync();
  //if there is an user, delete it
  await User.destroy({ where: {} });

  const user = await User.create({
    username: "test",
    password: await bcrypt.hash("123", 10),
    savedCourses : JSON.stringify([]),
  });
  console.log("User created:", user.toJSON());
}

createUser();
