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
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function handleGetRequest(req: any, res: any) {
	try {
		const { prayerId } = req.query;
		const prayer = await Prayers.findById(prayerId);
		if (!prayer)
			res.status(404).json({ error: "Can not get the prayer to load." });
		res.status(200).json(prayer);
	} catch (error) {
		return res.status(404).json({ error: "Can not get the prayer." });
	}
}
