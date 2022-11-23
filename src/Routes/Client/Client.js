import {Router} from "express";

export const clientRoutes = Router();

import ClientController from "../../app/Http/Controller/Client/Client.js";
import AuthLoginController from "../../app/Http/Controller/Client/AuthLogin.js";

clientRoutes.post("/sign-up", ClientController.storageNewClient );
clientRoutes.post("/sign-in", AuthLoginController.createSession );
clientRoutes.get("/profile", ClientController.profile );