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
	prayedDate: string;
	displayNum: number;
	name: string;
};

export default function Stats({
	answered,
	personal,
	createdAt,
	prayedDate,
	displayNum,
	name,
}: Props) {
	const PostedDate = () => {
		// Date Loaded Check
		if (createdAt === "") {
			return null;
		}
		if (createdAt !== "") {
			const date = new Date(createdAt);
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
			return <div className={styles.secondText}>{formattedDate}</div>;
		}
		return null;
	};
	const UpdatedDate = () => {
		// Date Loaded Check
		if (prayedDate === "" || displayNum === 0) {
			return <></>;
		}
		if (prayedDate !== "") {
			const date = new Date(prayedDate);
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
			return (
				<>
					<div className={styles.blockFlex}>
						<EventAvailableIcon className={styles.statIcon} />
						<div>
							<p className={styles.statText}>Last time you prayed:</p>
							<div className={styles.secondText}>{formattedDate}</div>
						</div>
					</div>
				</>
			);
		}
		return null;
	};

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
					{personal ? "Private" : `Posted by ${name}`}
				</p>
			</div>
			<div className={styles.blockFlex}>
				<FaPray className={styles.statIcon} />
				<div
					className={styles.statText}
					style={{ display: "flex", gap: "4px" }}>
					<p>Times you prayed:</p> <span>{displayNum}</span>
				</div>
			</div>
			<UpdatedDate />
			<div className={styles.blockFlex}>
				<TodayIcon className={styles.statIcon} />
				<div>
					<p className={styles.statText}>Date posted:</p>
					<PostedDate />
				</div>
			</div>
		</div>
	);
}
