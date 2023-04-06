import React from "react";
import styles from "@/styles/Home.module.css";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "../../lib/helper";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import PrayerForms from "./PrayerFroms";

export default function HomeScreen() {
	const visible = useSelector((state) => state.app.client.toggleFormVisible);
	const { isLoading, isError, data, error } = useQuery("prayers", getPrayers);

	if (isLoading) return <div>Prayer is Loading...</div>;
	if (isError) return <div>Got Error {error}</div>;

	return (
		<section className={styles.masterContainer}>
			{/* Cards space */}
			<div className={styles.cardSection}>
				{data.map((obj, i) => (
					<PrayerCard {...obj} prayerNumber={i + 1} key={i} />
				))}
			</div>
			{/* Textinput feild */}
			{visible ? <PrayerForms /> : <></>}
		</section>
	);
}
