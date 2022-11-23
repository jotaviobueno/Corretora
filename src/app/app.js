import cors from "cors";

import { clientRoutes } from "../Routes/Client/Client.js";

export default function Application (app, express) {
	
	// express uses middleware
	app.use(cors());
	
	app.use(express());
	
	app.use(express.urlencoded({ extended: true }));
	
	app.use(express.json({limit: "50mb"}));

	app.use("/", clientRoutes);
}