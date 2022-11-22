import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Oders = new Schema({

	user_id: { type: Object, required: true, },
	type: { type: String, required: true },
	oder: { type: String, required: true },
	status: { type: String, required: true },
	created_at: { type: Date, default: Date.now, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date, default: Date.now }
});

export default mongoose.model("Oders", Oders);