import { Schema, model } from "mongoose";

let Communities;

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
	Communities = model("community");
} catch {
	Communities = model("community", CommunitySchema);
}
export default Communities;
