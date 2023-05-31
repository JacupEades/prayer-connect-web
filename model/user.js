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
			type: [
				{
					abbreviation: {
						type: String,
						unique: true,
					},
					comName: {
						type: String,
						unique: true,
					},
				},
			],
			default: [
				{
					abbreviation: "G",
					comName: "Global",
				},
			],
		},
		selectedCommunity: {
			type: {
				abbreviation: String,
				comName: String,
			},
			default: {
				abbreviation: "G",
				comName: "Global",
			},
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
