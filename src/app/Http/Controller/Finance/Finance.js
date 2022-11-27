import FinanceServices from "../../Services/Finance/Finance.js";

class FinanceController {

	async deposit(req, res) {
		const {session_id} = req.headers;
		const {coin} = req.params;
		const {value} = req.body;
        
		const returnMessage = await FinanceServices.deposit(session_id, coin, value);

		return res.status(returnMessage.statuscode).json(returnMessage.message);
	}
}

export default new FinanceController;