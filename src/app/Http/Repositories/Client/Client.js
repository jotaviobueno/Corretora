import ClientModel from "../../../Models/Client/Client.js";

import {hash} from "bcrypt";

class ClientRepository {

	async existCpf(cpf) {
		try {

			const client = await ClientModel.findOne({cpf: cpf, deleted_at: null});

			if (!client)
				return false;

			return client;

		} catch (e) {
			return false;
		}
	}

	async existUsername(username) {
		try {

			const client = await ClientModel.findOne({username: username, deleted_at: null});

			if (!client)
				return false;

			return client;

		} catch (e) {
			return false;
		}
	}

	async existEmail(email) {
		try {

			const client = await ClientModel.findOne({email: email, deleted_at: null});

			if (!client)
				return false;

			return client;

		} catch (e) {
			return false;
		}
	}

	async findClientById(client_id) {
		try {
		
			const client = await ClientModel.findOne({_id: client_id, deleted_at: null});

			if (!client)
				return false;

			return client;
			
		} catch (e) {
			return false;
		}
	}

	async storageClient(client) {
		return await ClientModel.create({
			full_name: client.full_name,
			username: client.username,
			email: client.email,
			active: true,
			email_verified: false,
			password: await hash(client.password, 10),
			avatar_url: client.avatar_url,
			genre: client.genre,
			birth_date: client.birth_date,
			cpf: client.cpf,
			resident_country: client.resident_country,
			fixed_erros: [],
			permissions: ["guest"],
			created_at: new Date(),
			updated_at: new Date(),
			update_logs: [{
				type: "CREATED_ACCOUNT",
				description: "account created successfully", 
				created_at: new Date()
			}],
			deleted_at: null,
		});
	}
	
	async addLog(client_id, type, description) {
		const newLog = await ClientModel.updateOne({_id: client_id, deleted_at: null}, {
			$push: { update_logs: { type: type, description: description,  updated_at: new Date()}}
		});

		if (newLog)
			return true;

		return false;
	}
}

export default new ClientRepository;