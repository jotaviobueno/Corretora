import {Router} from "express";

export const clientRoutes = Router();

import ClientController from "../app/Http/Controller/Client/Client.js";

clientRoutes.post("/sign-up", ClientController.storageNewClient );