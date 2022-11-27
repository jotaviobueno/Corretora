import ClientModel from "../../../Models/Client/Client.js";
import OdersModel from "../../../Models/Client/Oders.js";

import generationJWT from "../../../Utils/Finance/GenerationJWT.js";

import storage from "../../../../config/storage.js";

import axios from "axios";

class FinanceRepository {

	async createWallet(client_id) {
		try {
	
			const {data} = await axios.post(`${storage.finance_uri}/create-wallet`, {
				body: { token: generationJWT(client_id).toString()}
			});
	
			if (data.wallet.wallet_id) {
				await ClientModel.updateOne({_id: client_id, deleted_at: null}, 
					{ wallet_id: data.wallet.wallet_id, updated_at: new Date() });
			}
	
			return true;

		} catch (e) {
			await OdersModel.create({
				user_id: client_id,
				type: "create",
				oder: "create_wallet",
				status: "waiting",
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null
			});
	
			return false;
		} 
	}

	async sendOderToCreateWallet() {
		const allOders = await OdersModel.find({deleted_at: null});

		if (allOders != 0 ) {

			allOders.forEach( async (oders) => {

				if (oders.oder === "create_wallet" && oders.status === "waiting") 
					await axios.post(`${storage.finance_uri}/create-wallet`, {
						body: { token: generationJWT(oders.user_id).toString(), oder_id: generationJWT(oders._id).toString()}

					}).then( async (Data) => {
						let data = Data.data;

						if (data.wallet.wallet_id) {
							await ClientModel.updateOne({_id: oders.user_id, deleted_at: null}, 
								{ wallet_id: data.wallet.wallet_id, updated_at: new Date() });
	
							await OdersModel.updateOne({_id: oders._id, deleted_at: null}, { 
								status: "created", 
								updated_at: new Date()
							});
						}

					}).catch((e) => {
						return false;
					});
			});
		}
	}

	async getBalance (client_id) {
		try {

			const {data} = await axios.post(`${storage.finance_uri}/balance`, {
				body: { token: generationJWT(client_id).toString()}
			});	

			return data;

		} catch (e) {
			return false;
		}
	}

	async deposit(client_id, coin, value, oder_id) {
		try {
	
			const {data} = await axios.post(`${storage.finance_uri}/deposit`, {
				body: { 
					token: generationJWT(client_id).toString(),
					coin: coin, 
					value: generationJWT(value).toString(),
					oder_id: generationJWT(oder_id).toString(),
				}
			});
			
			return data;

		} catch (e) {
			return false;
		}
	}

	async createOder(client_id, coin, value) {
		return await OdersModel.create({
			user_id: client_id,
			type: "deposit",
			oder: "deposit",
			status: "waiting",
			coin: coin,
			value: value,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null
		});
	}

	async updateOder(oder_id) {
		const update = await OdersModel.updateOne({_id: oder_id}, {
			status: "successfully_deposited"
		});

		if (update.matchedCount === 1)
			return true;

		return false;
	}
}

export default new FinanceRepository;