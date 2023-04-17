import React from "react";
import styles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
// type Props = {
// 	name: string;
// 	title: string;
// 	message: string;
// 	prayedFor: number;
// 	createdAt: string;
// };
// {
// 	name,
// 	title,
// 	message,
// 	prayedFor,
// 	createdAt,
// }: Props

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
				<div className={styles.cardName}>name</div>
				{/* Date */}
				<div>createdAt</div>
				{/* Title and Message */}
				<div className={styles.cardTextContainer}>
					<h2>title</h2>
					<p>message</p>
				</div>
			</div>
			{/* Count and pray Btn */}
			<div className={styles.cardPrayContainer}>
				<div className={styles.cardPrayedForContainer}>
					<FaPray className={styles.prayCountIcon} />
					<p className={styles.prayCountNumber}>prayedFor</p>
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
