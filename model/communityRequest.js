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

try {
	CommunityRequest = model("CommunityRequest");
} catch {
	CommunityRequest = model("CommunityRequest", CommunityRequestSchema);
}
export default CommunityRequest;
