import React from "react";
import styles from "@/styles/Community.module.css";
import { getPrayers, getPrayer } from "../../lib/prayerHelper";
import { useQuery } from "react-query";
import cardStyles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { useDispatch } from "react-redux";
import { prayerById } from "@/redux/slices/prayerSlice";

export default function Community() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { isLoading, isError, data, error } = useQuery("prayers", getPrayers);

	if (isLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (isError)
		return (
			<div className={styles.loadingOrError}>
				Prayers being loaded error {error}
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

	const prayerBtnclicked = (e) => {
		e.stopPropagation();
		console.log("prayer Btn clicked");
	};

	return (
		<>
			<section className={styles.masterContainer}>
				<p className={styles.masterContainerP}>
					Prayer requests shared by your church community. The prayer count only
					includes the number of times you’ve prayed.
				</p>
				{/* Card Section */}
				<div className={styles.cardSection}>
					{data
						.filter((obj) => {
							if (obj.answered === false && obj.personal === false) {
								return obj;
							}
						})
						.slice(0)
						.reverse()
						.map((obj, i) => {
							const createdAt = obj.createdAt;
							const momentCreatedAt = moment(createdAt);
							const daysAgo = moment().diff(momentCreatedAt, "days");

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
											<p className={cardStyles.prayCountNumber}>
												{obj.prayedFor}
											</p>
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
