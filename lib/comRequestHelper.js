export const getComRequests = async () => {
	const response = await fetch(`/api/community-requests`);
	const json = await response.json();

	return json;
};

export const addComRequest = async (comReqData) => {
	try {
		const Options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(comReqData),
		};

		const response = await fetch(`/api/community-requests`, Options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
export const deleteComRequest = async (comReqId) => {
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "DELETE",
			// headers: { "Content-Type": "application/json" },
		};

		const response = await fetch(
			`/api/community-requests/?comReqId=${comReqId}`,
			Options
		);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
