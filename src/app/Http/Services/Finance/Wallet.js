import ClientModel from "../../../Models/Client/Client.js";
import OdersModel from "../../../Models/Client/Oders.js";

import storage from "../../../../config/storage.js";
import generationJWT from "../../../Utils/Finance/GenerationJWT.js";

import axios from "axios";

class WalletServices {

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
}

export default new WalletServices;