import Prayers from "@/model/prayer";
import Users from "@/model/user";

// GET: http://localhost:3000/api/users
export async function getUsers(req, res) {
	try {
		const users = await Users.find({});

		if (!users)
			return res.status(404).json({ error: "Error, No users to load." });
		res.status(200).json(users);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}
// POST: http://localhost:3000/api/users
export async function postUser(req, res) {
	try {
		const formData = await Users.create(req.body);

		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		}
		return res.status(200).json(formData);
	} catch (error) {
		return res.status(404).json({ error });
	}
}

// GET single user: http://localhost:3000/api/users/userId
export async function getUser(req, res) {
	try {
		const { userId } = req.query;
		const user = await Users.findById(userId);

		if (!userId)
			res.status(404).json({ error: "Can not get the user to load." });
		res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({ error: "Can not get the user." });
	}
}

// PUT: http://localhost:3000/api/prayers/prayerId
export async function putUsers(req, res) {
	try {
		const { prayerId } = req.query;
		const formData = req.body;

		if (prayerId && formData) {
			let updatedPrayer = await Prayers.findByIdAndUpdate(prayerId, formData);
			return res.status(200).json(updatedPrayer);
		}
		return res
			.status(404)
			.json({ error: "Error editing prayer. PUT request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

// GET: http://localhost:3000/api/prayers
export async function getPrayers(req, res) {
	try {
		const prayers = await Prayers.find({});

		if (!prayers)
			return res.status(404).json({ error: "Error, No prayers to load." });
		res.status(200).json(prayers);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

// GET single user: http://localhost:3000/api/prayers/prayerId
export async function getPrayer(req, res) {
	try {
		const { prayerId } = req.query;
		const prayer = await Prayers.findById(prayerId);

		if (!prayerId)
			res.status(404).json({ error: "Can not get the prayer to load." });
		res.status(200).json(prayer);
	} catch (error) {
		return res.status(404).json({ error: "Can not get the prayer." });
	}
}

// POST: http://localhost:3000/api/prayers
export async function postPrayers(req, res) {
	try {
		const formData = await Prayers.create(req.body);

		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		}
		return res.status(200).json(formData);
	} catch (error) {
		return res.status(404).json({ error });
	}
}

// PUT: http://localhost:3000/api/prayers/prayerId
export async function putPrayers(req, res) {
	try {
		const { prayerId } = req.query;
		const formData = req.body;

		if (prayerId && formData) {
			let updatedPrayer = await Prayers.findByIdAndUpdate(prayerId, formData);
			return res.status(200).json(updatedPrayer);
		}
		return res
			.status(404)
			.json({ error: "Error editing prayer. PUT request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

// DELETE: http://localhost:3000/api/prayers/prayerId
export async function deletePrayer(req, res) {
	try {
		const { prayerId } = req.query;

		if (prayerId) {
			let deletedPrayer = await Prayers.findByIdAndDelete(prayerId);
			return res.status(200).json({ deleted: prayerId });
		}
		return res
			.status(404)
			.json({ error: "Error deleting prayer. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}
