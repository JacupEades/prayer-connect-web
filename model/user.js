import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
	{
		name: String,
		email: {
			type: String,
			required: true,
			index: true,
		},
		role: {
			type: String,
			default: "subscriber",
		},
		prayers: {
			type: Array,
			default: [],
		},
		language: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
