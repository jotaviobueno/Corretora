import ClientRepository from "../../Repositories/Client/Client.js";
import AuthLoginRepository from "../../Repositories/Client/AuthLogin.js";

import FinanceRepository from "../../Repositories/Finance/Finance.js";

class ClientServices {

	async storageNewClient(client) {

		await FinanceRepository.sendOderToCreateWallet();

		if ( await ClientRepository.existUsername(client.username) )
			return { statuscode: 422, message: { error: "informed username is already being used" } };

		if ( await ClientRepository.existEmail(client.email) )
			return { statuscode: 422, message: { error: "email invalid" } };

		if ( await ClientRepository.existCpf(client.cpf) )
			return { statuscode: 422, message: { error: "informed cpf is invalid" } };

		let clientStored;

		if (( clientStored = await ClientRepository.storageClient(client) )) {

			if ( await FinanceRepository.createWallet(clientStored._id )) {
				
				await ClientRepository.addLog(clientStored._id, "CREATED_WALLET", "user wallet has been successfully created");

				return { statuscode: 201, message: { success: "account and wallet create." } };
			}

			return { statuscode: 201, message: { success: "account create." } };
		}

		return { statuscode: 400, message: { error: "failed when trying to create your account." } };
	}

	async profile(session_id) {
		
		let session;

		if (!( session = await AuthLoginRepository.existSession(session_id) ))
			return { statuscode: 422, message: { error: "session id is invalid" } };

		let client;

		if ((client = await ClientRepository.findClientById(session.client_id))) {
			return { statuscode: 200, message: { 
				profile: {
					full_name: client.full_name,
					username: client.username,
					email: client.email,
					email_verified: client.email_verified,
					active: client.active,
					avatar_url: client.avatar_url,
					genre: client.genre,
					birth_date: client.birth_date,
					cpf: client.cpf,
					resident_country: client.resident_country,
					created_at: client.created_at,
					last_update: client.updated_at
				},
				wallet: {
					wallet_id: client.wallet_id,
					balance: await FinanceRepository.getBalance(client._id)
				}
	
			}};
		}
		
		return { statuscode: 400, message: { error: "profile display failure." } };
	}

	async outherProfile(session_id, username) {

		let session;

		if (!( session = await AuthLoginRepository.existSession(session_id) ))
			return { statuscode: 422, message: { error: "session id is invalid" } };

		if (!(await ClientRepository.findClientById(session.client_id)))
			return { statuscode: 200, message: { error: "your account has problems" } };

		let outherProfile;
		
		if ((outherProfile = await ClientRepository.existUsername(username)))
			return { statuscode: 200, message: { 
				profile: {
					full_name: outherProfile.full_name,
					username: outherProfile.username,
					email: outherProfile.email,
					email_verified: outherProfile.email_verified,
					active: outherProfile.active,
					avatar_url: outherProfile.avatar_url,
					genre: outherProfile.genre,
					birth_date: outherProfile.birth_date,
					cpf: outherProfile.cpf,
					resident_country: outherProfile.resident_country,
					created_at: outherProfile.created_at,
					last_update: outherProfile.updated_at
				}
			}};
	
		return { statuscode: 400, message: { error: "username is invalid." } };
	}
}

export default new ClientServices;