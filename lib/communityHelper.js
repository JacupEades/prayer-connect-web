export const getCommunities = async () => {
	const response = await fetch(`/api/communities`);
	const json = await response.json();

	return json;
};
// Posting new user
export const addCommunity = async (comData) => {
	try {
		console.log("comData", comData);
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(comData),
		};

		const response = await fetch(`/api/communities`, Options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
