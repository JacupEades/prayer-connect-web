import connectMongo from "@/database/conn";
import Prayers from "@/model/prayer";

export default async function prayerEndpoint(req: any, res: any) {
	try {
		await connectMongo();
	} catch (error) {
		return res.status(500).json({ error: "Error in the connection." });
	}

	const { method } = req;

	switch (method) {
		case "GET":
			return handleGetRequest(res);
		case "POST":
			return handlePostRequest(req, res);
		case "PUT":
			return handlePutRequest(req, res);
		case "DELETE":
			return handleDeleteRequest(req, res);
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function handleGetRequest(res: any) {
	try {
		const prayers = await Prayers.find({});
		if (!prayers)
			return res.status(404).json({ error: "Failed to retrieve the prayers." });

		return res.status(200).json(prayers);
	} catch (error) {
		return res.status(500).json({ error: "Failed to retrieve the prayers." });
	}
}

async function handlePostRequest(req: any, res: any) {
	try {
		const formData = await Prayers.create(req.body);
		if (!formData)
			return res.status(400).json({ error: "Failed to create form data." });

		return res.status(200).json(formData);
	} catch (error) {
		return res.status(500).json({ error: "Failed to create form data." });
	}
}

async function handlePutRequest(req: any, res: any) {
	const { prayerId } = req.query;
	const formData = req.body;

	if (!prayerId || !formData)
		return res.status(400).json({ error: "Missing prayerId or formData." });

	try {
		const updatedPrayer = await Prayers.findByIdAndUpdate(prayerId, formData);
		if (!updatedPrayer)
			return res.status(404).json({ error: "Failed to update the prayer." });

		return res.status(200).json(updatedPrayer);
	} catch (error) {
		return res.status(500).json({ error: "Failed to update the prayer." });
	}
}

async function handleDeleteRequest(req: any, res: any) {
	const { prayerId } = req.query;

	if (!prayerId) return res.status(400).json({ error: "Missing prayerId." });

	try {
		const deletedPrayer = await Prayers.findByIdAndDelete(prayerId);
		if (!deletedPrayer)
			return res.status(404).json({ error: "Failed to delete the prayer." });

		return res.status(200).json({ deleted: prayerId });
	} catch (error) {
		return res.status(500).json({ error: "Failed to delete the prayer" });
	}
}
