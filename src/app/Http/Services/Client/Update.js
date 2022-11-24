import UpdateRepository from "../../Repositories/Client/Update.js";
import ClientRepository from "../../Repositories/Client/Client.js";
import AuthLoginRepository from "../../Repositories/Client/AuthLogin.js";

class UpdateServices {

	async updateFullname(session_id, new_fullname) {
        
		let session;

		if (!( session = await AuthLoginRepository.existSession(session_id) ))
			return { statuscode: 422, message: { error: "session id is invalid." } };

		let client;

		if (!(client = await ClientRepository.findClientById(session.client_id)))
			return { statuscode: 200, message: { error: "your account has problems." } };

		if (new_fullname === client.full_name)
			return { statuscode: 422, message: { error: "the name entered is identical to the account." } };

		if (await UpdateRepository.updateFullname(client._id, new_fullname)) {

			await ClientRepository.addLog(client._id, "UPDATE_FULL_NAME", "full name changed successfully");

			return { statuscode: 422, message: { success: "full name changed successfully." } };
		}

		return { statuscode: 400, message: { error: "failed to change full name." } };
	}

	async updateUsername(session_id, new_username) {
		
		let session;

		if (!( session = await AuthLoginRepository.existSession(session_id) ))
			return { statuscode: 422, message: { error: "session id is invalid." } };

		let client;

		if (!(client = await ClientRepository.findClientById(session.client_id)))
			return { statuscode: 200, message: { error: "your account has problems." } };

		if (new_username === client.username)
			return { statuscode: 422, message: { error: "the name entered is identical to the account." } };

		if (await ClientRepository.existUsername(new_username))
			return { statuscode: 422, message: { success: "informed username is already in use." } };

		if (await UpdateRepository.updateUsername(client._id, new_username)) {

			await ClientRepository.addLog(client._id, "UPDATE_USERNAME", "username changed successfully");

			return { statuscode: 422, message: { success: "full name changed successfully." } };
		}

		return { statuscode: 400, message: { error: "failed to change username." } };
	}

}

export default new UpdateServices;