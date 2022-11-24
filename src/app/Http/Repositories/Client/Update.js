import ClientModel from "../../../Models/Client/Client.js";

class UpdateRepository {

	async updateFullname(client_id, new_fullname) {
		const update = await ClientModel.updateOne({_id: client_id, deleted_at: null}, 
			{ full_name: new_fullname, updated_at: new Date() });

		if (update.matchedCount === 1)
			return true;

		return false;
	}

	async updateUsername(client_id, new_username) {
		const update = await ClientModel.updateOne({_id: client_id, deleted_at: null}, 
			{ username: new_username, updated_at: new Date() });

		if (update.matchedCount === 1)
			return true;

		return false;
	}

}

export default new UpdateRepository;