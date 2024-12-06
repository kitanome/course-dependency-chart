import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "database.sqlite",
});

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Database connection established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

testConnection();

export default sequelize;
