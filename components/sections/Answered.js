import React, { useState } from "react";
import styles from "@/styles/Community.module.css";
import { getPrayers, getPrayer } from "@/lib/prayerHelper";
import { getUsers } from "@/lib/userHelper";
import { useQuery } from "react-query";
import cardStyles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { prayerById } from "@/redux/slices/prayerSlice";
import { updateUserPrayerCount } from "../../lib/userHelper";

export default function Answered({ sortValue, whoValue, namedValue }) {
	const [prayerCounts, setPrayerCounts] = useState({});

	const { user } = useSelector((state) => ({
		...state,
	}));
	const dispatch = useDispatch();
	const router = useRouter();
	// default filters state should be allboth
	const filters = whoValue + "/" + namedValue;

	const { isLoading, isError, data, error } = useQuery("prayers", getPrayers);
	const {
		data: userData,
		isLoading: userLoading,
		isError: userIsError,
		refetch,
	} = useQuery("users", getUsers);

	if (isLoading || userLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (isError || userIsError)
		return (
			<div className={styles.loadingOrError}>
				Prayers being loaded error {error}
			</div>
		);
	if (user.uid === "")
		return (
			<div className={styles.loadingOrError}>
				Please log in to view players. {error}
			</div>
		);

	const handleCardClick = async (_id) => {
		try {
			const res = await getPrayer(_id);
			// Redux store
			dispatch(
				prayerById({
					prayerId: res._id,
					uid: res.userId,
				})
			);
			router.push("/home/my-prayer");
		} catch (error) {
			console.log(error);
		}
	};

	const currentUserData = () =>
		userData.filter((obj) => {
			if (obj.uid === user.uid) return obj;
		});
	const uData = currentUserData();

	const sortedData = data.map((pObj) => {
		console.log("uData:", uData);
		const countObj =
			uData.length > 0
				? uData[0].prayerCounts.find((uObj) => uObj.prayerId === pObj._id)
				: 0;
		return {
			_id: pObj._id,
			count: countObj ? countObj.count : 0,
		};
	});

	// Sort the sortedData array by count
	sortedData.sort((a, b) => b.count - a.count);

	return (
		<>
			<section className={styles.masterContainer}>
				<p className={styles.masterContainerP}>
					Praise report for all God’s answered prayers and blessings
				</p>
				{/* Card Section */}
				<div className={styles.cardSection}>
					{data
						.sort((a, b) => {
							let indexA = 0;
							let indexB = 0;
							switch (sortValue) {
								case "oldest":
									return new Date(a.createdAt) - new Date(b.createdAt);
								case "mostPrayers":
									indexA = sortedData.findIndex((obj) => obj._id === a._id);
									indexB = sortedData.findIndex((obj) => obj._id === b._id);
									return indexA - indexB;
								case "leastPrayers":
									indexA = sortedData.findIndex((obj) => obj._id === a._id);
									indexB = sortedData.findIndex((obj) => obj._id === b._id);
									return indexB - indexA;
								default:
									return new Date(b.createdAt) - new Date(a.createdAt);
							}
						})
						.filter((obj) => {
							const tabDefault =
								obj.answered === true && obj.personal === false;
							const other = obj.userId !== user.uid;
							const mine = obj.userId === user.uid;
							const anon = obj.name === "Anonymous";
							const publicName = obj.name !== "Anonymous";

							switch (filters) {
								case "other/both":
									if (other && tabDefault) {
										return obj;
									}
									break;
								case "mine/both":
									if (mine && tabDefault) {
										return obj;
									}
									break;
								case "all/anon":
									if (anon && tabDefault) {
										return obj;
									}
									break;
								case "all/public":
									if (publicName && tabDefault) {
										return obj;
									}
									break;
								case "other/anon":
									if (other && anon && tabDefault) {
										return obj;
									}
									break;
								case "other/public":
									if (other && publicName && tabDefault) {
										return obj;
									}
									break;
								case "mine/anon":
									if (mine && anon && tabDefault) {
										return obj;
									}
									break;
								case "mine/public":
									if (mine && publicName && tabDefault) {
										return obj;
									}
									break;
								default:
									if (tabDefault) {
										return obj;
									}
							}
						})
						.map((obj, i) => {
							const createdAt = obj.createdAt;
							const momentCreatedAt = moment(createdAt);
							const daysAgo = moment().diff(momentCreatedAt, "days");
							const currentCount = prayerCounts[obj._id] || 0;
							let displayNum = 0;

							const userPrayerCount = () => {
								uData.length > 0
									? uData[0].prayerCounts.filter((userPCObj) => {
											if (userPCObj.prayerId === obj._id) {
												displayNum = userPCObj.count;
											}
									  })
									: (displayNum = 0);
							};
							// update the card pray count on render
							userPrayerCount();

							return (
								<article
									onClick={() => handleCardClick(obj._id)}
									className={cardStyles.prayerCardContainer}
									key={i}>
									<div className={cardStyles.prayerCardClickContainer}>
										{/* Name & Date */}
										<div className={cardStyles.cardNameContainer}>
											<div className={cardStyles.cardName}>{obj.name}</div>
											<div className={cardStyles.cardName}>
												{daysAgo === 0
													? "Today"
													: daysAgo === 1
													? "Yesterday"
													: `${daysAgo} days ago`}
											</div>
										</div>

										{/* Title and Message */}
										<div className={cardStyles.cardTextContainer}>
											<h2>{obj.title}</h2>
											<p>{obj.message}</p>
										</div>
									</div>
									{/* Count and pray Btn */}
									<div className={cardStyles.cardPrayContainer}>
										<div className={cardStyles.cardPrayedForContainer}>
											<FaPray className={cardStyles.prayCountIcon} />
											<div>{displayNum}</div>
										</div>
									</div>
								</article>
							);
						})}
				</div>
			</section>
		</>
	);
}
