import { Schema, model } from "mongoose";

let Users;

const userSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		approvedCommunities: {
			type: Array,
			default: ["G"],
		},
		selectedCommunity: {
			type: String,
			default: "G",
		},
		prayerCounts: [
			{
				prayerId: { type: String },
				count: { type: Number, default: 0 },
				updated: { type: Date, default: Date.now },
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
	Users = model("Users");
} catch {
	Users = model("Users", userSchema);
}

export default Users;
