import AuthLoginServices from "../../Services/Client/AuthLogin.js";

class AuthLoginController {

	async createSession(req, res) {
		const {email, password} = req.body;
		const userAgent = req.headers["user-agent"];

		const returnMessage = await AuthLoginServices.createSession(email, password, userAgent);

		return res.status(returnMessage.statuscode).json(returnMessage.message);
	}

}

export default new AuthLoginController;