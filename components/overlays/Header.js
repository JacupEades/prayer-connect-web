import React from "react";
import styles from "@/styles/Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

export default function Header({
	filterMenu,
	oldFirst,
	leastPrayed,
	selection,
	sortValue,
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
								filterMenu();
							}}
							className={styles.headerFilterIconContainer}>
							<FilterAltIcon className={styles.headerFilterIcon} />
						</Button>
					</div>
					{sortValue === "leastPrayers" ? (
						<></>
					) : (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									oldFirst();
								}}
								className={
									sortValue === "oldest"
										? styles.headerOptionSelected
										: styles.headerOptionIconContainer
								}>
								<p className={styles.headerOptionText}>Oldest First</p>
								{sortValue === "oldest" ? (
									<CloseIcon className={styles.closeIcon} />
								) : (
									""
								)}
							</Button>
						</div>
					)}

					{sortValue === "oldest" ? (
						<></>
					) : (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									leastPrayed();
								}}
								className={
									sortValue === "leastPrayers"
										? styles.headerOptionSelected
										: styles.headerOptionIconContainer
								}>
								<p className={styles.headerOptionText}>
									Least Prayed For (by me)
								</p>
								{sortValue === "leastPrayers" ? (
									<CloseIcon className={styles.closeIcon} />
								) : (
									""
								)}
							</Button>
						</div>
					)}
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
