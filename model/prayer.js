import { Schema, models, model } from "mongoose";
// const mongoose = require("mongoose");

const prayerSchema = new Schema(
	{
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
		approved: {
			type: Boolean,
			default: true,
		},
		// set the defaults
	},
	{ timestamps: true }
);

const Prayers = models.prayer || model("prayer", prayerSchema);
export default Prayers;
// module.exports = mongoose.model("Prayer", prayerSchema);
