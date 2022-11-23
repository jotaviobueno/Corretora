import {compare} from "bcrypt";

export default async function comparePassword(password, hash) {
	return await compare(password, hash);
}