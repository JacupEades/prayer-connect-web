import connectMongo from "@/database/conn";
import {
	getCommunities,
	postCommunities,
	putCommunities,
	deleteCommunity,
} from "@/database/controller";

export default async function ogCommunitiesHandler(
	req: { method: any },
	res: any
) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection." })
	);

	const { method } = req;
	switch (method) {
		case "GET":
			getCommunities(req, res);
			// res.status(200).json({ method, name: "GET Request" });
			break;
		case "POST":
			postCommunities(req, res);
			// res.status(200).json({ method, name: "POST Request" });
			break;
		case "PUT":
			// putCommunities(req, res);
			res.status(200).json({ method, name: "PUT Request" });
			break;
		case "DELETE":
			// deleteCommunity(req, res);
			res.status(200).json({ method, name: "DELETE Request" });
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
