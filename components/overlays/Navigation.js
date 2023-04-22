import React from "react";
import styles from "@/styles/Nav.module.css";
import GroupsIcon from "@mui/icons-material/Groups";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoginIcon from "@mui/icons-material/Login";

export default function Navigation({ selectString, selection }) {
	const { user } = useSelector((state) => ({
		...state,
	}));
	const router = useRouter();

	const userId = user.uid;

	const handleAddPrayerBtn = () => {
		router.push("/home/my-prayer/new-prayer");
	};
	const addBtnNoUserId = () => {
		toast.warning("Please log in to add your prayers");
	};

	const AddPrayerBtn = () => {
		if (selection === "Settings") {
			// In the settings menu
			return null;
		} else if (!userId) {
			// User not logged in
			return (
				<Button onClick={addBtnNoUserId} className={styles.addBtn}>
					<AddIcon className={styles.addBtnIcon} />
				</Button>
			);
		} else {
			// User logged in and not in settings
			return (
				<Button onClick={handleAddPrayerBtn} className={styles.addBtn}>
					<AddIcon className={styles.addBtnIcon} />
				</Button>
			);
		}
	};

	const SettingsLoginBtn = () => {
		// User not logged in changes btn to log in btn
		if (!userId) {
			return (
				<div className={styles.navBtnContainer}>
					<Button
						onClick={() => {
							router.push("/login/existing-user");
						}}
						className={styles.navBtn}>
						<LoginIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Log in</p>
				</div>
			);
		}
		// Settings btn
		return (
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
		);
	};

	return (
		<nav className={styles.navMasterContainer}>
			<AddPrayerBtn />

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
						<SignLanguageIcon
							className={styles.navBtnIcon}
							style={{ transform: "scaleX(-1)" }}
						/>
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
				<SettingsLoginBtn />
			</div>
		</nav>
	);
}
