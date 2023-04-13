import React from "react";
import styles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function PrayerCard() {
	const router = useRouter();

	const handleCardClick = () => {
		router.push("/home/my-prayer");
	};

	const prayerBtnclicked = () => {
		console.log("prayer Btn clicked");
	};

	return (
		<article className={styles.prayerCardContainer}>
			<div
				onClick={handleCardClick}
				className={styles.prayerCardClickContainer}>
				{/* Name */}
				<div className={styles.cardName}>Jacob Eades</div>
				{/* Title and Message */}
				<div className={styles.cardTextContainer}>
					<h2>Page Transitions</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima odio
						ipsum, vel ex accusantium architecto molestias facilis alias aliquam
						veritatis, quibusdam ipsam in accusamus adipisci necessitatibus esse
						cumque eligendi perspiciatis.
					</p>
				</div>
			</div>
			{/* Count and pray Btn */}
			<div className={styles.cardPrayContainer}>
				<div className={styles.cardPrayedForContainer}>
					<FaPray className={styles.prayCountIcon} />
					<p className={styles.prayCountNumber}>1</p>
				</div>
				<Button
					onClick={prayerBtnclicked}
					variant="contained"
					className={styles.prayBtn}>
					<FaPray className={styles.prayBtnIcon} />
				</Button>
			</div>
		</article>
	);
}
