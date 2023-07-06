import { Schema, model, Document, Model } from "mongoose";

let Communities: Model<ICommunities>;

export interface ICommunities extends Document {
	name: string;
	abbreviation: string;
	comDescription: string;
	createdAt: Date;
	updatedAt: Date;
}

const CommunitySchema = new Schema(
	{
		name: {
			type: String,
			maxlength: 300,
			text: true,
			required: true,
		},
		abbreviation: {
			type: String,
			required: true,
		},
		comDescription: {
			type: String,
			default: "No description provided. Contact Jacob Eades.",
		},
	},
	{ timestamps: true }
);

// Create unique indexes
CommunitySchema.index({ name: 1 }, { unique: true });
CommunitySchema.index({ abbreviation: 1 }, { unique: true });
CommunitySchema.index({ comDescription: 1 }, { unique: false });

try {
	Communities = model<ICommunities>("community");
} catch {
	Communities = model<ICommunities>("community", CommunitySchema);
}
export default Communities;
