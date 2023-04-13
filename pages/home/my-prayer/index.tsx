import React, { useState } from "react";
import styles from "@/styles/PrayerPage.module.css";
import { Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { FaPray } from "react-icons/fa";
import Stats from "../../../components/prayer_view/Stats";
import Details from "@/components/prayer_view/Details";
import { useRouter } from "next/router";

type Props = {};

export default function MyPrayerView({}: Props) {
	const [selection, setSelection] = useState("Details");

	const router = useRouter();

	const componentSelector = (selection: String) => {
		switch (selection) {
			case "Details":
				return <Details />;
			case "Stats":
				return <Stats />;
			default:
				console.log("You broke my app, C'mon!");
		}
	};

	return (
		<main className={styles.prayerMain}>
			{/* Back arrow and pray button */}
			<div className={styles.topBtns}>
				<Button onClick={() => router.back()} className={styles.backArrowBtn}>
					<ArrowBackOutlinedIcon />
				</Button>
				<Button variant="contained" className={styles.prayBtn}>
					<FaPray className={styles.prayBtnIcon} />
				</Button>
			</div>
			{/* Title */}
			<h1 className={styles.title}>
				Prayer TransitionPrayer TransitionPrayer Transition
			</h1>
			{/* Content */}
			<section>
				{/* Two buttons and edit */}
				<div className={styles.viewSelectBtnContainer}>
					<div>
						<Button
							onClick={() => setSelection("Details")}
							className={styles.selectBtn}>
							Details
						</Button>
						<Button
							onClick={() => setSelection("Stats")}
							className={styles.selectBtn}>
							Stats
						</Button>
					</div>
					<Button
						onClick={() => router.push("/home/my-prayer/prayer-edit")}
						className={styles.selectBtn}>
						<CreateOutlinedIcon />
					</Button>
				</div>
				{componentSelector(selection)}
			</section>
		</main>
	);
}
