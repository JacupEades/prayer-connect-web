import React from "react";
import styles from "@/styles/Skeletons.module.css";

type Props = {};

export default function Loading({}: Props) {
	return <div className={styles.loading}>loading</div>;
}
