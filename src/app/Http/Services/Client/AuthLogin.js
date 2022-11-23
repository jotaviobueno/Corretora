import AuthLoginRepository from "../../Repositories/Client/AuthLogin.js";
import ClientRepository from "../../Repositories/Client/Client.js";

import comparePassword from "../../../Utils/Client/ComparePassword.js";

class AuthLoginServices {

	async createSession(email, password, userAgent) {
        
		let client;

		if (! (client = await ClientRepository.existEmail(email)) )
			return { statuscode: 422, message: { error: "informed email does not exist" } };
        
		if (! await comparePassword(password, client.password) )
			return { statuscode: 403, message: { error: "not authorized" } };

		let session;

		if ( (session = await AuthLoginRepository.createSession(email, client._id, userAgent) ))
			return { statuscode: 201, message: { 
				success: "session created", 
				session: { 
					session_id: session.session_id,
					email: session.email,
					user_agent: userAgent
				} 
			}};

		return { statuscode: 400, message: { error: "failed when trying to create your session" } };
	}

}

export default new AuthLoginServices;