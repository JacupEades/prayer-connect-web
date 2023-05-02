import React, { useState } from "react";
import styles from "@/styles/Community.module.css";
import { getPrayers, getPrayer } from "@/lib/prayerHelper";
import { getUsers } from "@/lib/userHelper";
import { useQuery } from "react-query";
import cardStyles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { prayerById } from "@/redux/slices/prayerSlice";
import { updateUserPrayerCount } from "../../lib/userHelper";

export default function Community({ sortValue, whoValue, namedValue }) {
	const [isPraying, setIsPraying] = useState(false);
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
	} = useQuery("users", getUsers);

	if (isLoading || userLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (isError || userIsError)
		return (
			<div className={styles.loadingOrError}>
				Prayers being loaded error {error}
			</div>
		);

	const currentUserData = userData.filter((obj) => {
		if (obj.uid === user.uid) return obj;
	});

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

	return (
		<>
			<section className={styles.masterContainer}>
				<p className={styles.masterContainerP}>
					Prayer requests shared by your church community.
				</p>
				{/* Card Section */}
				<div className={styles.cardSection}>
					{data
						.sort((a, b) =>
							sortValue !== "oldest"
								? new Date(b.createdAt) - new Date(a.createdAt)
								: new Date(a.createdAt) - new Date(b.createdAt)
						)
						.filter((obj) => {
							const tabDefault =
								obj.answered === false && obj.personal === false;
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

							// Backup no filters
							// if (obj.answered === false && obj.personal === false) {
							// 	return obj;
							// }
						})
						.map((obj, i) => {
							const createdAt = obj.createdAt;
							const momentCreatedAt = moment(createdAt);
							const daysAgo = moment().diff(momentCreatedAt, "days");

							const userPrayerCount = currentUserData[0].prayerCounts.filter(
								(userPCObj) => {
									if (userPCObj.prayerId === obj._id) {
										return userPCObj.count;
									}
								}
							);

							const prayerBtnclicked = (e) => {
								e.stopPropagation();
								const userDBId = `?userId=${currentUserData[0]._id}`;
								const formData = {
									prayerCounts: [{ prayerId: obj._id, count: 1 }],
								};

								updateUserPrayerCount(userDBId, formData);
							};

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
											{userPrayerCount.length > 0 && (
												<span>{userPrayerCount[0].count}</span>
											)}
										</div>
										<Button
											onClick={prayerBtnclicked}
											variant="contained"
											className={cardStyles.prayBtn}>
											<FaPray className={cardStyles.prayBtnIcon} />
										</Button>
									</div>
								</article>
							);
						})}
				</div>
			</section>
		</>
	);
}
