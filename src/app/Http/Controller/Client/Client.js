import ClientServices from "../../Services/Client/Client.js";

class ClientController {

	async storageNewClient (req, res) {
		const client = {
			full_name: req.body.full_name,
			username: req.body.username.replace(" ", ""),
			email: req.body.email,
			password: req.body.password,
			avatar_url: req.body.avatar_url ?? "",
			genre: req.body.genre,
			birth_date: new Date(req.body.birth_date),
			cpf: req.body.cpf,
			resident_country: req.body.resident_country.toUpperCase(),
		};

		const returnMessage = await ClientServices.storageNewClient(client);

		return res.status(returnMessage.statuscode).json(returnMessage.message);
	}

	async profile (req, res) {
		const {session_id} = req.headers;

		const returnMessage = await ClientServices.profile(session_id);

		return res.status(returnMessage.statuscode).json(returnMessage.message);
	}
}

export default new ClientController;