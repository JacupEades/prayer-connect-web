import connectMongo from "@/database/conn";
import Users, { IUser } from "@/model/user";

export default async function userEndpoint(req: any, res: any) {
	try {
		await connectMongo();
	} catch (error) {
		res.status(405).json({ error: "Error in the connection." });
	}

	const { method } = req;

	switch (method) {
		case "GET":
			return handleGetRequest(res);
		case "POST":
			return handlePostRequest(req, res);
		case "PUT":
			return handlePutRequest(req, res);
		case "DELETE":
			return handleDeleteRequest(req, res);
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

async function handleGetRequest(res: any) {
	try {
		const users: IUser[] = await Users.find({});

		if (!users) {
			return res.status(404).json({ error: "Error, No users to load." });
		}

		return res.status(200).json(users);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

async function handlePostRequest(req: any, res: any) {
	try {
		const formData = await Users.create(req.body);

		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		}

		return res.status(200).json(formData);
	} catch (error) {
		return res.status(404).json({ error });
	}
}

async function handlePutRequest(req: any, res: any) {
	try {
		const { userId } = req.query;
		const formData = req.body;

		// Validation
		if (!userId || !formData) {
			return res
				.status(404)
				.json({ error: "Error editing prayer. PUT request." });
		}

		const newDisplayName = formData.newDisplayName;
		const updatedUserName = await Users.findByIdAndUpdate(userId, {
			$set: { name: newDisplayName },
		});

		const putType = formData.putType;

		switch (putType) {
			case "prayerCount":
				const checkOldCounts = await Users.findById(userId);
				const [{ prayerId }] = formData.prayerCounts;
				const updatedDate = formData.updated;

				if (checkOldCounts) {
					const oldCountBObj = checkOldCounts.prayerCounts?.find(
						(obj) => obj.prayerId === prayerId
					);

					let updatedPrayerCount;

					if (oldCountBObj === undefined && formData.addUndo === false) {
						console.log("updatedPrayerCount 1 update user");
						updatedPrayerCount = await Users.findByIdAndUpdate(
							userId,
							{ $push: formData },
							{ new: true }
						);
					} else if (formData.addUndo === true) {
						console.log("updatedPrayerCount 2 undo 1");
						updatedPrayerCount = await Users.findByIdAndUpdate(
							userId,
							{
								$inc: { "prayerCounts.$[elem].count": -1 },
								$set: { "prayerCounts.$[elem].updated": updatedDate },
							},
							{
								arrayFilters: [{ "elem.prayerId": prayerId }],
								new: true,
								returnOriginal: false,
							}
						);
					} else {
						console.log("updatedPrayerCount 3 add 1");
						updatedPrayerCount = await Users.findByIdAndUpdate(
							userId,
							{
								$inc: { "prayerCounts.$[elem].count": 1 },
								$set: { "prayerCounts.$[elem].updated": updatedDate },
							},
							{
								arrayFilters: [{ "elem.prayerId": prayerId }],
								new: true,
								returnOriginal: false,
							}
						);
					}

					return res.status(200).json(updatedPrayerCount);
				} else {
					return res.status(400).json({ error: "Error in prayer count" });
				}

			case "displayName":
				return res.status(200).json(updatedUserName);

			case "newCommunity":
				const newCommunity = formData.newCommunity;
				try {
					const { abbreviation, comName } = newCommunity;

					const user = await Users.findById(userId);
					if (user === null || user.approvedCommunities === undefined)
						return res.status(400).json({
							error: "User was null or approvedCommunities was undefined.",
						});
					const communityExists = user.approvedCommunities.some(
						(community) =>
							community.abbreviation === abbreviation ||
							community.comName === comName
					);

					if (communityExists) {
						return res.status(400).json({
							error: "Community already exists in the approved communities.",
						});
					}

					const updatedComArr = await Users.findByIdAndUpdate(
						userId,
						{ $push: { approvedCommunities: newCommunity } },
						{ new: true }
					);

					return res.status(200).json(updatedComArr);
				} catch (error) {
					return res
						.status(500)
						.json({ error: "Error while adding the new community." });
				}

			case "selectCommunity":
				const { abbreviation, comName } = formData.selectCommunity;
				await Users.findByIdAndUpdate(userId, {
					$set: {
						selectedCommunity: {
							abbreviation: abbreviation,
							comName: comName,
						},
					},
				});
				return res.status(200).json(updatedUserName);

			default:
				console.log("Error In putType selection: ", putType);
				console.log("formData.putType:", formData.putType);
		}
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

async function handleDeleteRequest(req: any, res: any) {
	try {
		const { userId } = req.query;
		if (userId) {
			await Users.findByIdAndDelete(userId);
			return res.status(200).json({ deleted: userId });
		}

		return res
			.status(404)
			.json({ error: "Error deleting user. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}
