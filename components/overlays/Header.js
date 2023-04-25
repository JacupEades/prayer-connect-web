import React from "react";
import styles from "@/styles/Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

export default function Header({
	fliterMenu,
	oldFirst,
	leastPrayed,
	selection,
}) {
	const PrayerHeader = () => {
		return (
			<header className={styles.headerMasterContainer}>
				<div className={styles.headerTopContainer}>
					<h1 className={styles.headerTitle}>
						{selection === "Private Prayers" ? "My " : ""}
						{selection}
					</h1>
					<SearchIcon className={styles.headerSearchIcon} />
				</div>
				<div className={styles.headerBottomContainer}>
					<div className={styles.btnContainer}>
						<Button
							variant="outlined"
							onClick={() => {
								fliterMenu();
							}}
							className={styles.headerFilterIconContainer}>
							<FilterAltIcon className={styles.headerFilterIcon} />
						</Button>
					</div>
					<div className={styles.btnContainer}>
						<Button
							variant="outlined"
							onClick={() => {
								oldFirst();
							}}
							className={styles.headerOptionIconContainer}>
							<p className={styles.headerOptionText}>Oldest First</p>
						</Button>
					</div>
					<div className={styles.btnContainer}>
						<Button
							variant="outlined"
							onClick={() => {
								leastPrayed();
							}}
							className={styles.headerOptionIconContainer}>
							<p className={styles.headerOptionText}>
								Least Prayed For (by me)
							</p>
						</Button>
					</div>
					<div className={styles.btnContainer}>
						<Button
							variant="outlined"
							onClick={() => {
								fliterMenu();
							}}
							className={styles.headerFilterIconContainer}>
							<FilterAltIcon className={styles.headerFilterIcon} />
						</Button>
					</div>
					<div className={styles.btnContainer}>
						<Button
							variant="outlined"
							onClick={() => {
								oldFirst();
							}}
							className={styles.headerOptionIconContainer}>
							<p className={styles.headerOptionText}>Oldest First</p>
						</Button>
					</div>
					<div className={styles.btnContainer}>
						<Button
							variant="outlined"
							onClick={() => {
								leastPrayed();
							}}
							className={styles.headerOptionIconContainer}>
							<p className={styles.headerOptionText}>
								Least Prayed For (by me)
							</p>
						</Button>
					</div>
				</div>
			</header>
		);
	};
	const SettingsHeader = () => {
		return (
			<header className={styles.headerSettingContainer}>
				<div className={styles.headerTopContainer}>
					<h1 className={styles.headerTitle}>{selection}</h1>
				</div>
			</header>
		);
	};
	return (
		<>{selection === "Settings" ? <SettingsHeader /> : <PrayerHeader />}</>
	);
}
