import React from "react";
import styles from "@/styles/Nav.module.css";
import GroupsIcon from "@mui/icons-material/Groups";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Navigation({ selectString, selection }) {
	const router = useRouter();

	const handleAddPrayerBtn = () => {
		router.push("/home/my-prayer/new-prayer");
	};

	return (
		<nav className={styles.navMasterContainer}>
			{selection === "Settings" ? (
				""
			) : (
				<Button onClick={handleAddPrayerBtn} className={styles.addBtn}>
					<AddIcon className={styles.addBtnIcon} />
				</Button>
			)}

			<div className={styles.navMainMasterContainer}>
				{/* Community Prayers button */}
				<div className={styles.navBtnContainer}>
					<Button
						onClick={() => {
							selectString("Community Prayers");
						}}
						className={
							selection === "Community Prayers"
								? styles.navBtnFocus
								: styles.navBtn
						}>
						<GroupsIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Community</p>
				</div>
				{/* Answered Prayers button */}
				<div className={styles.navBtnContainer}>
					<Button
						onClick={() => {
							selectString("Answered Prayers");
						}}
						className={
							selection === "Answered Prayers"
								? styles.navBtnFocus
								: styles.navBtn
						}>
						<SignLanguageIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Answered</p>
				</div>
				{/* Private Prayers button */}
				<div className={styles.navBtnContainer}>
					<Button
						onClick={() => {
							selectString("Private Prayers");
						}}
						className={
							selection === "Private Prayers"
								? styles.navBtnFocus
								: styles.navBtn
						}>
						<PersonIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Private</p>
				</div>
				{/* Settings button */}
				<div className={styles.navBtnContainer}>
					<Button
						onClick={() => {
							selectString("Settings");
						}}
						className={
							selection === "Settings" ? styles.navBtnFocus : styles.navBtn
						}>
						<SettingsIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Settings</p>
				</div>
			</div>
		</nav>
	);
}
