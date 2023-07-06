import connectMongo from "@/database/conn";
import CommunityRequest from "@/model/communityRequest";

export default async function comRequestEndpoint(req: any, res: any) {
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
		case "DELETE":
			return handleDeleteRequest(req, res);
		default:
			res.setHeader("Allow", ["GET", "POST", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function handleGetRequest(res: any) {
	try {
		const comRequests = await CommunityRequest.find({});

		if (!comRequests)
			return res.status(404).json({ error: "Error, No comRequests to load." });
		return res.status(200).json(comRequests);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

async function handlePostRequest(req: any, res: any) {
	try {
		const formData = await CommunityRequest.create(req.body);
		console.log("formData from controller", formData);
		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		} else {
			return res.status(200).json(formData);
		}
	} catch (error) {
		return res
			.status(404)
			.json({ error: "Error while posting comRequest data." });
	}
	// Might need this for it to work
	//
	// if (error.code === 11000) {
	// 	// Duplicate key error
	// 	return res.status(400).json({ error: "Request already exists." });
	// } else {
	// 	return res.status(500).json({ error: "Failed to create community." });
	// }
}

async function handleDeleteRequest(req: any, res: any) {
	try {
		const { comReqId } = req.query;

		if (comReqId) {
			await CommunityRequest.findByIdAndDelete(comReqId);
			return res.status(200).json({ deleted: comReqId });
		}
		return res
			.status(404)
			.json({ error: "Error deleting Community Request. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}
