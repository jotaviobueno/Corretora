import mongoose from "mongoose";
import chalk from "chalk-animation";
import storage from "../config/storage.js";

const connection = () => {
	mongoose.connect(storage.mongoURI).then(() => {
		chalk.karaoke("Database connection established.");
	});
};

export default connection();