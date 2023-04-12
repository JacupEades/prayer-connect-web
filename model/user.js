import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
	{
		name: String,
		email: {
			type: String,
			required: true,
			index: true,
		},
		role: {
			type: String,
			default: "subscriber",
		},
		prayers: {
			type: Array,
			default: [],
		},
		language: String,
	},
	{ timestamps: true }
);

const Users = models.user || model("user", userSchema);
export default Users;
