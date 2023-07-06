import { Schema, model, Document, Model } from "mongoose";

let Prayers: Model<IPrayer>;

export interface IPrayer extends Document {
	userId: string;
	name: string;
	title: string;
	message: string;
	prayedFor: number;
	prayerNumber: number;
	answered: boolean;
	personal: boolean;
	community: string;
	approved: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const prayerSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			default: "Anonymous",
		},
		title: {
			type: String,
			maxlength: 300,
			text: true,
			required: true,
			default: "Title",
		},
		message: {
			type: String,
			maxlength: 2000,
			text: true,
			default: "No details provided.",
		},
		prayedFor: {
			type: Number,
			default: 0,
		},
		prayerNumber: {
			type: Number,
			default: 0,
		},
		// combo of user and schema/ grab the count after the
		answered: {
			type: Boolean,
			default: false,
		},
		personal: {
			type: Boolean,
			default: false,
		},
		community: {
			type: String,
			default: "G",
		},
		approved: {
			type: Boolean,
			default: true,
		},
		// set the defaults
	},
	{ timestamps: true }
);

try {
	Prayers = model<IPrayer>("prayer");
} catch {
	Prayers = model<IPrayer>("prayer", prayerSchema);
}
export default Prayers;
