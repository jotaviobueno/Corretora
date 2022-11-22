import dotenv from "dotenv";

dotenv.config();

const storage = {
	mongoURI: process.env.MONGO_URI,
	finance_uri: process.env.FINANCE_URI,
	jwt_secret: process.env.JWT_SECRET
};

export default storage;