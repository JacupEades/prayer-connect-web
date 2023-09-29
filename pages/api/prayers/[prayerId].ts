import connectMongo from "@/database/conn";
import Prayers from "@/model/prayer";

export default async function prayerById(req: any, res: any) {
	try {
		await connectMongo();
	} catch (error) {
		return res.status(500).json({ error: "Error in the connection." });
	}

	const { method } = req;

	switch (method) {
		case "GET":
			return handleGetRequest(req, res);
		case "PUT":
			return handlePutRequest(req, res);
		default:
			res.setHeader("Allow", ["GET", "PUT"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function handleGetRequest(req: any, res: any) {
	try {
		const { prayerId } = req.query;
		const prayer = await Prayers.findById(prayerId);
		if (!prayer)
			res.status(404).json({ error: "Cannot find the prayer to load." });
		else res.status(200).json(prayer);
	} catch (error) {
		return res.status(404).json({ error: "Cannot get the prayer." });
	}
}

async function handlePutRequest(req: any, res: any) {
	try {
		const { prayerId } = req.query;
		const updatedPrayer = await Prayers.findByIdAndUpdate(prayerId, req.body, {
			new: true,
		});
		if (!updatedPrayer)
			res.status(404).json({ error: "Cannot update the prayer." });
		else res.status(200).json(updatedPrayer);
	} catch (error) {
		return res.status(500).json({ error: "Error updating the prayer." });
	}
}
