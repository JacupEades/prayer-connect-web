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

export default function PrivatePrayers({
	user,
	prayer,
	userData,
	prayerData,
	refetch,
	sortValue,
	answeredValue,
}) {
	const [prayerCounts, setPrayerCounts] = useState({});

	const dispatch = useDispatch();
	const router = useRouter();
	const currentDate = new Date().toISOString();

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

	const CardsData = () => {
		return prayerData
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
				const tabDefault = obj.personal === true && obj.userId === user.uid;
				switch (answeredValue) {
					case "answered":
						if (tabDefault && obj.answered === true) {
							return obj;
						}
						break;
					case "unanswered":
						if (tabDefault && obj.answered === false) {
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

					userPrayerCount();
					const userDBId = `?userId=${currentUserData[0]._id}`;
					const formData = {
						prayerCounts: [{ prayerId: obj._id, count: 1 }],
						addUndo: false,
						updated: currentDate,
						putType: "prayerCount",
					};

					await updateUserPrayerCount(userDBId, formData);
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

					await updateUserPrayerCount(userDBId, formData);
					refetch();
				};

				// update the card pray count on render
				userPrayerCount();

				const prayerButtonConditional = () => {
					if (obj.answered === true) {
						return <p className={styles.prayeredAnswered}>Answered!</p>;
					} else if (currentCount > 0) {
						return (
							<div className={cardStyles.undoContainer}>
								<p>Prayed!</p>
								<Button
									onClick={undoBtnclicked}
									variant="contained"
									className={cardStyles.undoBtn}>
									<ReplayIcon className={cardStyles.undoBtnIcon} />
								</Button>
							</div>
						);
					} else {
						return (
							<Button
								onClick={prayerBtnclicked}
								variant="contained"
								className={cardStyles.prayBtn}>
								<FaPray className={cardStyles.prayBtnIcon} />
							</Button>
						);
					}
				};

				return (
					<article
						onClick={() => handleCardClick(obj._id)}
						className={cardStyles.prayerCardContainer}
						key={i}>
						<div className={cardStyles.prayerCardClickContainer}>
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
							{prayerButtonConditional()}
						</div>
					</article>
				);
			});
	};

	const NoPrayersYet = () => {
		return (
			<article className={cardStyles.emptyStateCardMain}>
				<div className={cardStyles.emptyStateCard}>
					<div className={cardStyles.cardTextContainer}>
						<p className={cardStyles.emptyStateH3}>Prayers only you can see</p>
						<p>
							Start by adding a prayer on this page or changing the privacy
							setting of a prayer you posted in other pages.
						</p>
					</div>
				</div>
			</article>
		);
	};

	return (
		<>
			<section className={styles.masterContainer}>
				{prayerData
					.filter((obj) => {
						if (obj.personal === true && obj.userId === user.uid) {
							return obj;
						}
					})
					.map((x) => x).length === 0 ? (
					<NoPrayersYet />
				) : (
					<p className={styles.masterContainerP}>
						Record your personal prayers and praises here (visible only to you).
					</p>
				)}
				{/* Card Section */}
				<div className={styles.cardSection}>
					<CardsData />
				</div>
			</section>
		</>
	);
}
