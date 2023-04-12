import connectMongo from "../../../database/conn";
import {
	getPrayers,
	postPrayers,
	putPrayers,
	deletePrayer,
} from "../../../database/controller";

export default async function ogPrayerHandler(
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

	const { method } = req;
	switch (method) {
		case "GET":
			getPrayers(req, res);
			// res.status(200).json({ method, name: "GET Request" });
			break;
		case "POST":
			postPrayers(req, res);
			// res.status(200).json({ method, name: "POST Request" });
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
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
