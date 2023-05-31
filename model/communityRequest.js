import { Schema, model } from "mongoose";

let CommunityRequest;

const CommunityRequestSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
		},
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
		comName: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// Create unique indexes
CommunityRequestSchema.index({ uid: 1 }, { unique: false });
CommunityRequestSchema.index({ name: 1 }, { unique: false });
CommunityRequestSchema.index({ abbreviation: 1 }, { unique: true });
CommunityRequestSchema.index({ comName: 1 }, { unique: true });

try {
	CommunityRequest = model("CommunityRequest");
} catch {
	CommunityRequest = model("CommunityRequest", CommunityRequestSchema);
}
export default CommunityRequest;
