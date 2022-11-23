import SessionModel from "../../../Models/Client/Session.js";

import { nanoid } from "nanoid";
import ip from "ip";

class AuthLoginRepository {

	async createSession(email, client_id, userAgent) {
		return await SessionModel.create({
			email: email,
			address_ip: ip.address(),
			user_agent: userAgent,
			session_id: nanoid(),
			client_id: client_id,
			updated_at: new Date(),
			created_at: new Date(),
			disconnected_in: null
		});
	}

	async existSession(session_id) {
		try {

			const session = await SessionModel.findOne({session_id: session_id, disconnected_in: null });

			if (! session )
				return false;

			return session;

		} catch(e) {
			return false;
		}
	}

}

export default new AuthLoginRepository;