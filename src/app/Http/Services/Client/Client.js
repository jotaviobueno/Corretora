import ClientRepository from "../../Repositories/Client/Client.js";

import WalletServices from "../Finance/Wallet.js";

class ClientServices {

	async storageNewClient(client) {

		if ( await ClientRepository.existUsername(client.username) )
			return { statuscode: 422, message: { error: "informed username is already being used" } };

		if ( await ClientRepository.existEmail(client.email) )
			return { statuscode: 422, message: { error: "email invalid" } };

		if ( await ClientRepository.existCpf(client.cpf) )
			return { statuscode: 422, message: { error: "informed cpf is invalid" } };

		let clientStored;

		if (( clientStored = await ClientRepository.storageClient(client) )) {

			if ( await WalletServices.createWallet(clientStored._id )) {
				
				await ClientRepository.addLog(clientStored._id, "CREATED_WALLET", "user wallet has been successfully created");

				return { statuscode: 201, message: { success: "account and wallet create." } };
			}

			return { statuscode: 201, message: { success: "account create." } };
		}

		return { statuscode: 400, message: { error: "failed when trying to create your account." } };
	}
}

export default new ClientServices;