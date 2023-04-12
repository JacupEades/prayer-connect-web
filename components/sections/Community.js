import React from "react";
import styles from "@/styles/Community.module.css";
import { useSelector } from "react-redux";

export default function Community() {
	// const visible = useSelector((state) => state.app.client.toggleFormVisible);
	// const { isLoading, isError, data, error } = useQuery("prayers", getPrayers);

	const user = useSelector((state) => state.user);

	// if (isLoading) return <div>Prayer is Loading...</div>;
	// if (isError) return <div>Got Error {error}</div>;
	console.log("Community file user from state:", user);
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
