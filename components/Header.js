import React from "react";
import styles from "@/styles/Header.module.css";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

export default function Header() {
	return (
		<header className={styles.headerMasterContainer}>
			<AiOutlineMenu size={42} />
			<h1>Pray-Connect</h1>
			<AiOutlineUser size={42} />
		</header>
	);
}
