import Prayers from "@/model/prayer";
import Users from "@/model/user";
import Communities from "@/model/communities";
import CommunityRequest from "@/model/communityRequest";

// USERS CONTROLLERS
// GET: http://localhost:3000/api/users
export async function getUsers(req, res) {
	try {
		const users = await Users.find({});

		if (!users)
			return res.status(404).json({ error: "Error, No users to load." });
		return res.status(200).json(users);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}
// POST: http://localhost:3000/api/users
export async function postUser(req, res) {
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

// GET single user: http://localhost:3000/api/users/userId
export async function getUser(req, res) {
	try {
		const { userId } = req.query;
		const user = await Users.findById(userId);

		if (!userId)
			return res.status(404).json({ error: "Can not get the user to load." });
		return res.status(200).json(user);
	} catch (error) {
		return res.status(404).json({ error: "Can not get the user." });
	}
}

// GET: http://localhost:3000/api/prayers
export async function getPrayers(req, res) {
	try {
		const prayers = await Prayers.find({});

		if (!prayers)
			return res.status(404).json({ error: "Error, No prayers to load." });
		return res.status(200).json(prayers);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

// GET single prayer: http://localhost:3000/api/prayers/prayerId
export async function getPrayer(req, res) {
	try {
		const { prayerId } = req.query;
		console.log("prayerId:", prayerId);
		const prayer = await Prayers.findById(prayerId);

		// console.log("prayer:", prayer);

		if (!prayer)
			res.status(404).json({ error: "Can not get the prayer to load." });
		res.status(200).json(prayer);
	} catch (error) {
		return res.status(404).json({ error: "Can not get the prayer." });
	}
}

// POST: http://localhost:3000/api/prayers
export async function postPrayers(req, res) {
	try {
		const formData = await Prayers.create(req.body);

		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		}
		return res.status(200).json(formData);
	} catch (error) {
		return res.status(404).json({ error });
	}
}

// PUT: http://localhost:3000/api/prayers/prayerId
export async function putPrayers(req, res) {
	try {
		const { prayerId } = req.query;
		const formData = req.body;

		if (prayerId && formData) {
			let updatedPrayer = await Prayers.findByIdAndUpdate(prayerId, formData);
			return res.status(200).json(updatedPrayer);
		}
		return res
			.status(404)
			.json({ error: "Error editing prayer. PUT request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

// DELETE: http://localhost:3000/api/prayers/prayerId
export async function deletePrayer(req, res) {
	try {
		const { prayerId } = req.query;

		if (prayerId) {
			let deletedPrayer = await Prayers.findByIdAndDelete(prayerId);
			return res.status(200).json({ deleted: prayerId });
		}
		return res
			.status(404)
			.json({ error: "Error deleting prayer. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}
// PUT: http://localhost:3000/api/users/userId
export async function putUsers(req, res) {
	try {
		const { userId } = req.query;
		const formData = req.body;
		// Validation
		if (!userId || !formData) {
			return res
				.status(404)
				.json({ error: "Error editing prayer. PUT request." });
		}

		const putType = formData.putType;

		switch (putType) {
			case "prayerCount":
				const checkOldCounts = await Users.findById(userId);
				const [{ prayerId }] = formData.prayerCounts;
				const updatedDate = formData.updated;
				const oldCountBObj = checkOldCounts.prayerCounts.find(
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

			case "displayName":
				const newDisplayName = formData.newDisplayName;
				updatedUserName = await Users.findByIdAndUpdate(userId, {
					$set: { name: newDisplayName },
				});
				return res.status(200).json(updatedUserName);

			case "newCommunity":
				const newCommunity = formData.newCommunity;
				try {
					const { abbreviation, comName } = newCommunity;

					const user = await Users.findById(userId);

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
				updatedComSelection = await Users.findByIdAndUpdate(userId, {
					$set: {
						selectedCommunity: { abbreviation: abbreviation, comName: comName },
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
// DELETE: http://localhost:3000/api/users/userId
export async function deleteUserInDB(req, res) {
	try {
		const { userId } = req.query;

		if (userId) {
			let deletedUser = await Users.findByIdAndDelete(userId);
			return res.status(200).json({ deleted: userId });
		}
		return res
			.status(404)
			.json({ error: "Error deleting user. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

// Communities CONTROLLERS
// GET: http://localhost:3000/api/communities
export async function getCommunities(req, res) {
	try {
		const communities = await Communities.find({});

		if (!communities)
			return res.status(404).json({ error: "Error, No communities to load." });
		return res.status(200).json(communities);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

// POST: http://localhost:3000/api/communities
export async function postCommunities(req, res) {
	try {
		const formData = await Communities.create(req.body);

		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		} else {
			return res.status(200).json(formData);
		}
	} catch (error) {
		if (error.code === 11000) {
			// Duplicate key error
			return res.status(400).json({ error: "Community already exists." });
		} else {
			return res.status(500).json({ error: "Failed to create community." });
		}
	}
}

// PUT: http://localhost:3000/api/communities/communityId
export async function putCommunities(req, res) {
	try {
		const { communityId } = req.query;
		const formData = req.body;

		if (communityId && formData) {
			let updatedCommunity = await Communities.findByIdAndUpdate(
				communityId,
				formData
			);
			return res.status(200).json(updatedCommunity);
		}
		return res
			.status(404)
			.json({ error: "Error editing Community. PUT request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

// DELETE: http://localhost:3000/api/communities/communityId
export async function deleteCommunity(req, res) {
	try {
		const { communityId } = req.query;

		if (communityId) {
			let deletedCommunity = await Communities.findByIdAndDelete(communityId);
			return res.status(200).json({ deleted: communityId });
		}
		return res
			.status(404)
			.json({ error: "Error deleting Community. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}

export async function getComRequest(req, res) {
	try {
		const comRequests = await CommunityRequest.find({});

		if (!comRequests)
			return res.status(404).json({ error: "Error, No comRequests to load." });
		return res.status(200).json(comRequests);
	} catch (error) {
		return res.status(404).json({ error: "Error While Fetching Data" });
	}
}

export async function postComRequest(req, res) {
	try {
		const formData = await CommunityRequest.create(req.body);
		console.log("formData from controller", formData);
		if (!formData) {
			return res.status(404).json({ error: "Form data not found." });
		} else {
			return res.status(200).json(formData);
		}
	} catch (error) {
		if (error.code === 11000) {
			// Duplicate key error
			return res.status(400).json({ error: "Request already exists." });
		} else {
			return res.status(500).json({ error: "Failed to create community." });
		}
	}
}

export async function deleteComRequest(req, res) {
	try {
		const { comReqId } = req.query;

		if (comReqId) {
			let deletedCommunity = await CommunityRequest.findByIdAndDelete(comReqId);
			return res.status(200).json({ deleted: comReqId });
		}
		return res
			.status(404)
			.json({ error: "Error deleting Community Request. DELETE request." });
	} catch (error) {
		return res.status(404).json({ error: "Error while updating the data." });
	}
}
