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

// Updating user
export const updateUserPrayerCount = async (userId, userData) => {
	// console.log("ID: ", userId);
	// console.log("data: ", userData);
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		};

		const response = await fetch(`/api/users/${userId}`, Options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
