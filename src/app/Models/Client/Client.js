import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Client = new Schema({

	full_name: { type: String, required: true, },
	username: { type: String, required: true },
	email: { type: String,required: true },
	email_verified: { type: Boolean, required: true },
	active: { type: Boolean, required: true },
	password: { type: String, required: true },
	avatar_url: { type: String },
	wallet_id: { type: String },
	genre: { type: String, required: true },
	birth_date: { type: Date, required: true },
	cpf: { type: String, required: false },
	resident_country: { type: String, required: true },
	permissions: { type: Array, required: true },
	created_at: { type: Date, default: Date.now, required: true },
	updated_at: { type: Date, required: true },
	update_logs: 
	[
		{
			type: { type: String, required: true },
			description: { type: String, required: true }, 
			created_at: { type: Date, required: true }
		}
	],
	fixed_erros: [
		{
			type: { type: String },
			description: { type: String }, 
		}
	],
	deleted_at: { type: Date, default: Date.now }
});

export default mongoose.model("Client", Client);