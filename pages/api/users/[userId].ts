import connectMongo from "../../../database/conn";
import { getUser, putUsers } from "../../../database/controller";

export default async function userHandler(
	req: { method: any },
	res: {
		status: (arg0: number) => {
			(): any;
			new (): any;
			json: { (arg0: { error: string }): any; new (): any };
			end: { (arg0: string): void; new (): any };
		};
		setHeader: (arg0: string, arg1: string[]) => void;
	}
) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the connection." })
	);
	// type of request
	const { method } = req;

	switch (method) {
		case "GET":
			getUser(req, res);
			// res.status(200).json({ method, name: "GET Request" });
			break;
		case "PUT":
			putUsers(req, res);
			// res.status(200).json(method);
			break;
		default:
			res.setHeader("Allow", ["GET", "PUT"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
