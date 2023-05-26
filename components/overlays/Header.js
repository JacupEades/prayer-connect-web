import React, { useEffect } from "react";
import styles from "@/styles/Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Button } from "@mui/material";
import OldestFirst from "../buttons/sort/OldestFirst";
import MostPrayedFor from "@/components/buttons/sort/MostPrayedFor";
import LeastPrayedFor from "@/components/buttons/sort/LeastPrayedFor";
import OthersPrayerBtn from "@/components/buttons/filter/OthersPrayerBtn";
import MyPrayersBtn from "@/components/buttons/filter/MyPrayersBtn";
import AnonymousBtn from "@/components/buttons/filter/AnonymousBtn";
import PublicBtn from "@/components/buttons/filter/PublicBtn";
import AnsweredBtn from "../buttons/filter/AnsweredBtn";
import UnansweredBtn from "../buttons/filter/UnansweredBtn";
import { useSelector } from "react-redux";

export default function Header({
	filterMenu,
	oldFirst,
	mostPrayed,
	leastPrayed,
	selection,
	sortValue,
	sortApplied,
	whoValue,
	answeredValue,
	answeredChip,
	unansweredChip,
	otherChip,
	mineChip,
	anonChip,
	publicChip,
	namedValue,
}) {
	const PrayerHeader = () => {
		const { selectedCommunity } = useSelector((state) => ({
			...state,
		}));

		return (
			<header className={styles.headerMasterContainer}>
				<div className={styles.headerTopContainer}>
					<h1 className={styles.headerTitle}>
						{selectedCommunity.community}{" "}
						{selection === "Private Prayers" ? "My " : ""}
						{selection}
					</h1>
					{/* <SearchIcon className={styles.headerSearchIcon} /> */}
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
					{/* sort chips */}
					<OldestFirst
						oldFirst={oldFirst}
						sortValue={sortValue}
						sortApplied={sortApplied}
					/>
					<MostPrayedFor mostPrayed={mostPrayed} sortValue={sortValue} />
					<LeastPrayedFor
						leastPrayed={leastPrayed}
						sortValue={sortValue}
						sortApplied={sortApplied}
					/>
					{/* filter chips */}
					<OthersPrayerBtn otherChip={otherChip} whoValue={whoValue} />
					<MyPrayersBtn mineChip={mineChip} whoValue={whoValue} />
					<AnonymousBtn anonChip={anonChip} namedValue={namedValue} />
					<PublicBtn publicChip={publicChip} namedValue={namedValue} />
				</div>
			</header>
		);
	};
	const PrivateHeader = () => {
		return (
			<header className={styles.headerMasterContainer}>
				<div className={styles.headerTopContainer}>
					<h1 className={styles.headerTitle}>My Private Prayers</h1>
					{/* <SearchIcon className={styles.headerSearchIcon} /> */}
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
					{/* sort chips */}
					<OldestFirst
						oldFirst={oldFirst}
						sortValue={sortValue}
						sortApplied={sortApplied}
						selection={selection}
					/>
					<MostPrayedFor mostPrayed={mostPrayed} sortValue={sortValue} />
					<LeastPrayedFor
						leastPrayed={leastPrayed}
						sortValue={sortValue}
						sortApplied={sortApplied}
						selection={selection}
					/>
					{/* filter chips */}
					<OthersPrayerBtn otherChip={otherChip} whoValue={whoValue} />
					<MyPrayersBtn mineChip={mineChip} whoValue={whoValue} />
					<AnonymousBtn anonChip={anonChip} namedValue={namedValue} />
					<PublicBtn publicChip={publicChip} namedValue={namedValue} />
					<UnansweredBtn
						unansweredChip={unansweredChip}
						answeredValue={answeredValue}
						sortApplied={sortApplied}
						selection={selection}
					/>
					<AnsweredBtn
						answeredChip={answeredChip}
						answeredValue={answeredValue}
						sortApplied={sortApplied}
						selection={selection}
					/>
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

	switch (selection) {
		case "Private Prayers":
			return <PrivateHeader />;
		case "Settings":
			return <SettingsHeader />;
		default:
			return <PrayerHeader />;
	}
}
