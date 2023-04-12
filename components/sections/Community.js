import React from "react";
import styles from "@/styles/Community.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function Community() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	console.log(user);
	return (
		<>
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
		</>
	);
}
