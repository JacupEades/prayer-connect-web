import connectMongo from "@/database/conn";
import {
	getComRequest,
	postComRequest,
	deleteComRequest,
} from "@/database/controller";

export default async function ogComRequestHandler(
	req: { method: any },
	res: any
) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection." })
	);

	const { method } = req;
	switch (method) {
		case "GET":
			getComRequest(req, res);
			// res.status(200).json({ method, name: "GET Request" });
			break;
		case "POST":
			postComRequest(req, res);
			// res.status(200).json({ method, name: "POST Request" });
			break;
		case "DELETE":
			deleteComRequest(req, res);
			// res.status(200).json({ method, name: "DELETE Request" });
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
