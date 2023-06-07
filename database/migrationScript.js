const mongoose = require("mongoose");
const { Schema, connect, model, connection } = mongoose;
require("dotenv").config();

connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

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

const Users = model("User", userSchema);

// Update function to migrate each document
async function migrateUser(user) {
	user.role = "user";

	// Update the document with the new fields and values
	user.selectedCommunity = {
		abbreviation: "G",
		comName: "Global",
	};
	user.approvedCommunities = [
		{
			abbreviation: "G",
			comName: "Global",
		},
	];

	// Save the updated document
	await user.save();
	console.log("Migrated user:", user._id);
}

async function runMigration() {
	try {
		// Find all users in the collection
		const users = await Users.find({});

		// Migrate each user
		for (const user of users) {
			await migrateUser(user);
		}

		console.log("Migration completed successfully.");
	} catch (error) {
		console.error("Error occurred during migration:", error);
	} finally {
		// Close the database connection
		connection.close();
	}
}

// Run the migration script
runMigration();
