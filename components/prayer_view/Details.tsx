import React from "react";
import styles from "@/styles/PrayerPage.module.css";

type Props = { detail: string };

export default function Details({ detail }: Props) {
	return <div className={styles.detailText}>{detail}</div>;
}
