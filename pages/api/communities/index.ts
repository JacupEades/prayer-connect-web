import connectMongo from "@/database/conn";
import Communities from "@/model/communities";

export default async function ogCommunitiesHandler(req: any, res: any) {
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
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function handleGetRequest(res: any) {
	try {
		const communities = await Communities.find({});

		if (!communities)
			return res.status(404).json({ error: "Error, No communities to load." });
		return res.status(200).json(communities);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

async function handlePostRequest(req: any, res: any) {
	try {
		const formData = await Communities.create(req.body);
		console.log("formData from controller", formData);
		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		} else {
			return res.status(200).json(formData);
		}
	} catch (error) {
		return res
			.status(404)
			.json({ error: "Failed: Error while posting community data." });
	}
	// Might need this for it to work
	//
	// if (error.code === 11000) {
	// 	// Duplicate key error
	// 	return res.status(400).json({ error: "Community already exists." });
	// } else {
	// 	return res.status(500).json({ error: "Failed to create community." });
	// }
}
