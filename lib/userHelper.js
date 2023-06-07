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
export const updateUser = async (userId, userData) => {
	try {
		const options = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		};

		const response = await fetch(`/api/users/${userId}`, options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
// Deleteing user
export const deleteUserInDB = async (userId) => {
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "DELETE",
			// headers: { "Content-Type": "application/json" },
		};

		const response = await fetch(`/api/users/?userId=${userId}`, Options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
