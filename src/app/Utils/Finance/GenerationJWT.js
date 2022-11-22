import storage from "../../../config/storage.js";

import jwt from "jsonwebtoken";

export default function generationJWT(data, expiresIn) {

	let params = { data: data };

	try {

		return jwt.sign(params, storage.jwt_secret, { expiresIn: expiresIn ?? new Date().setHours(new Date().getHours() + 1) /* 1h */ });

	} catch (e) {
		return false;
	}
}