import { Schema, model } from "mongoose";

let Users;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		prayers: [
			{
				type: Schema.Types.ObjectId,
				ref: "Prayer",
			},
		],
		language: {
			type: String,
			required: true,
			enum: ["Spanish", "English", "Mandarin"],
		},
	},
	{ timestamps: true }
);

try {
	Users = model("user");
} catch {
	Users = model("user", userSchema);
}
export default Users;
