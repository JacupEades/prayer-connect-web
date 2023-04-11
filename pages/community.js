import React from "react";
import styles from "@/styles/Community.module.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation.js";

export default function Community() {
	return (
		<>
			<Header />
			<section className={styles.masterContainer}>
				<p className={styles.masterContainerP}>
					Prayer requests shared by your church community. The prayer count only
					includes the number of times you’ve prayed.
				</p>
				{/* Cards space */}
				{/* <div className={styles.cardSection}>
					{data.map((obj, i) => (
						<PrayerCard {...obj} prayerNumber={i + 1} key={i} />
					))}
				</div> */}
			</section>
			<Navigation />
		</>
	);
}
