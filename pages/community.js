import React from "react";
import styles from "@/styles/Community.module.css";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import PrayerForms from "../components/forms/PrayerForms";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation.js";

export default function HomeScreen() {
	const visible = useSelector((state) => state.app.client.toggleFormVisible);
	const { isLoading, isError, data, error } = useQuery("prayers", getPrayers);

	if (isLoading) return <div>Prayer is Loading...</div>;
	if (isError) return <div>Got Error {error}</div>;

	return (
		<>
			<Header />
			<section className={styles.masterContainer}>
				<p className={styles.masterContainerP}>
					Prayer requests shared by your church community. The prayer count only
					includes the number of times you’ve prayed.
				</p>
				{/* Cards space */}
				<div className={styles.cardSection}>
					{data.map((obj, i) => (
						<PrayerCard {...obj} prayerNumber={i + 1} key={i} />
					))}
				</div>
				{/* Textinput feild */}
				{visible ? <PrayerForms /> : <></>}
			</section>
			<Navigation />
		</>
	);
}
