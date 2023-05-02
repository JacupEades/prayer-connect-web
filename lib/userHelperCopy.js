import Users from "../model/User";

// All users
export const getUsers = async () => {
	const response = await fetch(`/api/users`);
	const json = await response.json();

	return json;
};
// Posting new user
export const addUser = async (userData) => {
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		};

		const response = await fetch(`/api/users`, Options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
// PRAYER COUNT
export const updatePrayerCount = async (userDBId, prayerId) => {
	if (typeof Users.findByIdAndUpdate !== "function") {
		console.error("Users is not a Mongoose model");
	}
	// Getting the prayer Id
	const prayerObj = await fetch(`/api/prayers/${prayerId}`);
	const prayerJson = await prayerObj.json();
	const prayerObjId = await prayerJson._id;
	// Get the user prayer array
	const user = await fetch(`/api/users/${userDBId}`);
	const userJson = await user.json();
	const userId = await userJson._id;
	// Check if the prayer has aleady been prayed for
	if (userJson && prayerObj) {
		const update = {
			$push: { prayerCounts: { prayerId: prayerObjId, count: 1 } },
		};
		const options = { new: true };
		const updatedUser = await Users.findByIdAndUpdate(
			{ _id: userDBId },
			update,
			options
		);
		return updatedUser;
	}
	return {};
};
