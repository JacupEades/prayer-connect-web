import { Schema, model, Document, Model } from "mongoose";

let CommunityRequest: Model<ICommunityRequest>;

export interface ICommunityRequest extends Document {
	uid: string;
	name: string;
	abbreviation: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
}

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
	CommunityRequest = model<ICommunityRequest>("CommunityRequest");
} catch {
	CommunityRequest = model<ICommunityRequest>(
		"CommunityRequest",
		CommunityRequestSchema
	);
}
export default CommunityRequest;
