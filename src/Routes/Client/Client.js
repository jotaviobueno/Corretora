import {Router} from "express";

export const clientRoutes = Router();

import ClientController from "../../app/Http/Controller/Client/Client.js";
import AuthLoginController from "../../app/Http/Controller/Client/AuthLogin.js";
import UpdateController from "../../app/Http/Controller/Client/Update.js";

clientRoutes.post("/sign-up", ClientController.storageNewClient );
clientRoutes.post("/sign-in", AuthLoginController.createSession );
clientRoutes.get("/profile", ClientController.profile );
clientRoutes.get("/user/:username", ClientController.outherProfile );

clientRoutes.patch("/update/fullname", UpdateController.updateFullname );
clientRoutes.patch("/update/username", UpdateController.updateUsername );