import { Schema, model, Document, Model } from "mongoose";

let Users: Model<IUser>;

export interface IUser extends Document {
	uid: string;
	name: string;
	email: string;
	role?: string;
	approvedCommunities?: {
		abbreviation: string;
		comName: string;
	}[];
	selectedCommunity?: {
		abbreviation: string;
		comName: string;
	};
	prayerCounts?: {
		prayerId: string;
		count: number;
		updated: Date;
	}[];
	language: "Spanish" | "English" | "Mandarin";
}

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
		role: {
			type: String,
			default: "user",
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
	Users = model<IUser>("Users");
} catch {
	Users = model<IUser>("Users", userSchema);
}

export default Users;
