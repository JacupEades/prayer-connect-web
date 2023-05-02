import connectMongo from "@/database/conn";
import { getUsers, postUser, putUsers } from "@/database/controller";

export default async function ogUserHandler(req: { method: any }, res: any) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection." })
	);

	const { method } = req;
	switch (method) {
		case "GET":
			getUsers(req, res);
			// res.status(200).json({ method, name: "GET Request" });
			break;
		case "POST":
			postUser(req, res);
			// res.status(200).json({ method, name: "POST Request" });
			break;
		case "PUT":
			putUsers(req, res);
			// res.status(200).json({ method, name: "PUT Request" });
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
