import FinanceRepository from "../../Repositories/Finance/Finance.js";
import ClientRepository from "../../Repositories/Client/Client.js";
import AuthLoginRepository from "../../Repositories/Client/AuthLogin.js";

class FinanceServices {

	async deposit(session_id, coin, value) {

		if (value <= 5)
			return;

		let session;

		if (!( session = await AuthLoginRepository.existSession(session_id) ))
			return { statuscode: 422, message: { error: "session id is invalid." } };

		let client;

		if (!(client = await ClientRepository.findClientById(session.client_id)))
			return { statuscode: 200, message: { error: "your account has problems." } };

		const oder = await FinanceRepository.createOder(client._id, coin, value);
		
		const deposit = await FinanceRepository.deposit(client._id, coin, value, oder._id);

		if (deposit.wallet_id && deposit.oder_id) {

			await FinanceRepository.updateOder(deposit.oder_id);

			return { statuscode: 200, message: { deposit } };
		}

		return { statuscode: 400, message: { deposit } };
	}
}

export default new FinanceServices;