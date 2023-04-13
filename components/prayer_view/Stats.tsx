import React from "react";
import styles from "@/styles/PrayerPage.module.css";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TodayIcon from "@mui/icons-material/Today";
import { FaPray } from "react-icons/fa";
import { BsIncognito } from "react-icons/bs";

type Props = {};

export default function Stats({}: Props) {
	return (
		<div className={styles.statsContainer}>
			<p className={styles.statText}>Unanswered</p>
			<div className={styles.blockFlex}>
				<BsIncognito className={styles.statIcon} />
				<p className={styles.statText}>Posted Anonymousely</p>
			</div>
			<div className={styles.blockFlex}>
				<FaPray className={styles.statIcon} />
				<p className={styles.statText}>Times you prayed: 3</p>
			</div>
			<div className={styles.blockFlex}>
				<EventAvailableIcon className={styles.statIcon} />
				<div>
					<p className={styles.statText}>Last time you prayed:</p>
					<p className={styles.secondText}>April 06, 2023, 9:12 am</p>
				</div>
			</div>
			<div className={styles.blockFlex}>
				<TodayIcon className={styles.statIcon} />
				<div>
					<p className={styles.statText}>Date posted:</p>
					<p className={styles.secondText}>April 03, 2023, 12:23 pm</p>
				</div>
			</div>
		</div>
	);
}
