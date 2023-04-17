// Dev URL
const BASE_URL = "http://localhost:3000";
// Production URL
// const BASE_URL = "https://prayer-connect-web.vercel.app";

// All prayers
export const getPrayers = async () => {
	const response = await fetch(`${BASE_URL}/api/prayers`);
	const json = await response.json();

	return json;
};
// Single prayer
export const getPrayer = async (prayerId) => {
	const response = await fetch(`${BASE_URL}/api/prayers/${prayerId}`);
	const json = await response.json();

	if (json) return json;

	return {};
};
// Most recent prayer
export const getNewestPrayer = async () => {
	const response = await fetch(`${BASE_URL}/api/prayers`);
	// const newestPrayer = await Prayers.findOne().sort({ createdAt: -1 }).exec();

	const json = await response.json();

	if (json) return json;

	return {};
};
// Posting new prayer
export const addPrayer = async (prayerData) => {
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(prayerData),
		};

		const response = await fetch(`${BASE_URL}/api/prayers`, Options);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
// Updating prayer
export const updatePrayer = async (prayerId, prayerData) => {
	// console.log("ID: ", prayerId);
	// console.log("data: ", prayerData);
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(prayerData),
		};

		const response = await fetch(
			`${BASE_URL}/api/prayers/${prayerId}`,
			Options
		);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
// Deleteing prayer
export const deletePrayer = async (prayerId) => {
	try {
		// fetch by default uses GET request
		// Setting the options lets you change that
		const Options = {
			method: "DELETE",
			// headers: { "Content-Type": "application/json" },
		};

		const response = await fetch(
			`${BASE_URL}/api/prayers/?prayerId=${prayerId}`,
			Options
		);
		const json = await response.json();

		return json;
	} catch (error) {
		return error;
	}
};
