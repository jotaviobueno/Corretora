import UpdateServices from "../../Services/Client/Update.js";

class UpdateController {

	async updateFullname(req, res) {
		const {session_id} = req.headers;
		const {new_fullname} = req.body;   

		const returnMessage = await UpdateServices.updateFullname(session_id, new_fullname);

		return res.status(returnMessage.statuscode).json(returnMessage.message);
	}

	async updateUsername(req, res) {
		const {session_id} = req.headers;
		let new_userame = req.body.new_username.replace(" ", "");  

		const returnMessage = await UpdateServices.updateUsername(session_id, new_userame);

		return res.status(returnMessage.statuscode).json(returnMessage.message);
	}

}

export default new UpdateController;