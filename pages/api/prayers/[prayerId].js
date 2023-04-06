import connectMongo from "../../../database/conn";
import {
	getPrayer,
	putPrayers,
	deletePrayer,
} from "../../../database/controller";

export default async function ogPrayerHandler(req, res) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection." })
	);
	// type of request
	const { method } = req;

	switch (method) {
		case "GET":
			getPrayer(req, res);
			// res.status(200).json({ method, name: "GET Request" });
			break;
		case "PUT":
			putPrayers(req, res);
			// res.status(200).json({ method, name: "PUT Request" });
			break;
		case "DELETE":
			deletePrayer(req, res);
			// res.status(200).json({ method, name: "DELETE Request" });
			break;
		default:
			res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
