import React, { useState } from "react";
import styles from "@/styles/Community.module.css";
import { getPrayer } from "@/lib/prayerHelper";
import cardStyles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { useDispatch } from "react-redux";
import { prayerById } from "@/redux/slices/prayerSlice";
import { updateUser } from "../../lib/userHelper";

export default function Community({
	user,
	userData,
	selectedCom,
	prayerData,
	refetch,
	sortValue,
	whoValue,
	namedValue,
}) {
	const [prayerCounts, setPrayerCounts] = useState({});

	const dispatch = useDispatch();
	const router = useRouter();
	const currentDate = new Date().toISOString();
	// default filters state should be allboth
	const filters = whoValue + "/" + namedValue;

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

	const currentUserData = userData.filter((obj) => {
		if (obj.uid === user.uid) {
			return obj;
		} else if (obj.email === user.email) {
			return obj;
		} else {
			return;
		}
	});

	const sortedData = prayerData.map((pObj) => {
		const countObj =
			currentUserData.length > 0
				? currentUserData[0].prayerCounts.find(
						(uObj) => uObj.prayerId === pObj._id
				  )
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
					Pray with your community. Keep track of number of times you&apos;ve
					prayed.{" "}
					<span style={{ fontStyle: "italic" }}>
						Note: You can&apos;t see others&apos; prayer counts.
					</span>
				</p>
				{/* Card Section */}
				<div className={styles.cardSection}>
					{prayerData
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
								obj.answered === false &&
								obj.community === selectedCom &&
								obj.personal === false;
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
							const date = new Date(createdAt);
							const momentCreatedAt = moment(date);
							// This is checking if user has clicke the btn this render
							const currentCount = prayerCounts[obj._id] || 0;
							let displayNum = 0;

							const userPrayerCount = () => {
								currentUserData.length > 0
									? currentUserData[0].prayerCounts.filter((userPCObj) => {
											if (userPCObj.prayerId === obj._id) {
												displayNum = userPCObj.count;
											}
									  })
									: (displayNum = 0);
							};

							const prayerBtnclicked = async (e) => {
								e.stopPropagation();
								if (currentCount > 0) {
									console.log("You already prayed for this once.");
									return;
								}
								setPrayerCounts({
									...prayerCounts,
									[obj._id]: currentCount + 1,
								});

								const userDBId = `?userId=${currentUserData[0]._id}`;
								const formData = {
									prayerCounts: [{ prayerId: obj._id, count: 1 }],
									addUndo: false,
									updated: currentDate,
									putType: "prayerCount",
								};

								await updateUser(userDBId, formData);
								refetch();
							};
							const undoBtnclicked = async (e) => {
								e.stopPropagation();

								setPrayerCounts({
									...prayerCounts,
									[obj._id]: 0,
								});

								userPrayerCount();
								const userDBId = `?userId=${currentUserData[0]._id}`;
								const formData = {
									prayerCounts: [{ prayerId: obj._id, count: 1 }],
									addUndo: true,
									updated: currentDate,
									putType: "prayerCount",
								};

								await updateUser(userDBId, formData);
								refetch();
							};

							function getTimeStamp(date) {
								const now = moment();
								const diff = Math.abs(now.diff(date));
								const diffMinutes = Math.round(diff / (1000 * 60));
								const diffHours = Math.round(diff / (1000 * 60 * 60));
								const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

								if (diffMinutes < 60) {
									return `${diffMinutes} minutes ago`;
								} else if (diffHours < 24) {
									return `${diffHours} hours ago`;
								} else if (diffDays <= 5) {
									return `${diffDays} days ago`;
								} else {
									return date.format("LL");
								}
							}

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
												{getTimeStamp(momentCreatedAt)}
											</div>
										</div>

										{/* Title and Message */}
										<div className={cardStyles.cardTextContainer}>
											<h2>{obj.title}</h2>
											<p>{obj.message.replace(/\\n/g, " ")}</p>
										</div>
									</div>
									{/* Count and pray Btn */}
									<div className={cardStyles.cardPrayContainer}>
										<div className={cardStyles.cardPrayedForContainer}>
											<FaPray className={cardStyles.prayCountIcon} />
											<div>{displayNum}</div>
										</div>
										{currentCount > 0 ? (
											<div className={cardStyles.undoContainer}>
												<p>Prayed!</p>
												<Button
													onClick={undoBtnclicked}
													variant="contained"
													className={cardStyles.undoBtn}>
													<ReplayIcon className={cardStyles.undoBtnIcon} />
												</Button>
											</div>
										) : (
											<Button
												onClick={prayerBtnclicked}
												variant="contained"
												className={cardStyles.prayBtn}>
												<FaPray className={cardStyles.prayBtnIcon} />
											</Button>
										)}
									</div>
								</article>
							);
						})}
				</div>
			</section>
		</>
	);
}
