require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI, {
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

const Users = mongoose.model("User", userSchema);

// Update function to migrate each document
async function migrateUser(user) {
	// Check if the new fields already exist in the document
	if (
		user.selectedCommunity &&
		user.approvedCommunities &&
		user.selectedCommunity.abbreviation &&
		user.selectedCommunity.comName &&
		user.approvedCommunities.length > 0
	) {
		// If the new fields already exist, no action is needed
		console.log("Skipped migration for user:", user._id);
		return;
	}

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
		mongoose.connection.close();
	}
}

// Run the migration script
runMigration();
