import React from "react";
import styles from "@/styles/PrayerPage.module.css";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TodayIcon from "@mui/icons-material/Today";
import { FaPray } from "react-icons/fa";
import { BsIncognito } from "react-icons/bs";
import PersonIcon from "@mui/icons-material/Person";

type Props = {
	answered: boolean;
	personal: boolean;
	createdAt: string;
	prayedFor: number;
	name: string;
};

export default function Stats({
	answered,
	personal,
	createdAt,
	prayedFor,
	name,
}: Props) {
	const dateString = createdAt;
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	const formatter = new Intl.DateTimeFormat("en-US", options);
	const formattedDate = formatter.format(date);
	console.log(formattedDate);

	return (
		<div className={styles.statsContainer}>
			<p className={styles.statText}>{answered ? "Answered" : "Unanswered"}</p>
			<div className={styles.blockFlex}>
				{personal ? (
					<BsIncognito className={styles.statIcon} />
				) : (
					<PersonIcon className={styles.statIcon} />
				)}
				<p className={styles.statText}>
					{personal ? "Posted Anonymously" : `Posted by ${name}`}
				</p>
			</div>
			<div className={styles.blockFlex}>
				<FaPray className={styles.statIcon} />
				<p className={styles.statText}>Times you prayed: {prayedFor}</p>
			</div>
			<div className={styles.blockFlex}>
				<EventAvailableIcon className={styles.statIcon} />
				<div>
					<p className={styles.statText}>Last time you prayed:</p>
					<p className={styles.secondText}>Currently unavailable</p>
				</div>
			</div>
			<div className={styles.blockFlex}>
				<TodayIcon className={styles.statIcon} />
				<div>
					<p className={styles.statText}>Date posted:</p>
					<p className={styles.secondText}>{formattedDate}</p>
				</div>
			</div>
		</div>
	);
}
