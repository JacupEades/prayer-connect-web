import styles from "@/styles/Login.module.css";
import UserNameForm from "../../../components/forms/UserNameForm";
import React from "react";

export default function ExistingUser() {
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Please provide your display name.</h1>
			{UserNameForm()}
		</main>
	);
}
