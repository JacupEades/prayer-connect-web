import React, { useEffect, useState } from "react";
import Navigation from "@/components/overlays/Navigation";
import Header from "@/components/overlays/Header";
import Community from "@/components/sections/Community";
import Answered from "@/components/sections/Answered";
import PrivatePrayers from "@/components/sections/PrivatePrayers";
import Settings from "@/components/sections/Settings";
import {
	Button,
	FormControl,
	FormControlLabel,
	RadioGroup,
	SwipeableDrawer,
} from "@mui/material";
import headerStyles from "@/styles/Header.module.css";
import Radio from "@mui/material/Radio";

import customRadios from "@/styles/PrayerPage.module.css";

type Props = {};

export default function HomePage({}: Props) {
	const [fMenuOpen, setFMenuOpen] = useState(false);
	const [oldest, setOldest] = useState(false);
	const [sortLeast, setSortLeast] = useState(false);
	const [selection, setSelection] = useState("Community Prayers");

	useEffect(() => {
		console.log("____________________________");
		console.log("fMenuOpen: ", fMenuOpen);
		console.log("oldest: ", oldest);
		console.log("sortLeast: ", sortLeast);
	}, [fMenuOpen, oldest, sortLeast]);

	// Drawer utiliies

	// functions for the Header
	const fliterMenu = () => {
		setFMenuOpen(!fMenuOpen);
	};

	const oldFirst = () => {
		setOldest(!oldest);
	};

	const leastPrayed = () => {
		setSortLeast(!sortLeast);
	};

	// functions for the navigation
	const selectCall = (data: string) => {
		setSelection(data);
	};

	const componentSelector = () => {
		switch (selection) {
			case "Community Prayers":
				return (
					<Community
						fliterMenu={fliterMenu}
						oldest={oldest}
						leastPrayed={leastPrayed}
					/>
				);
			case "Private Prayers":
				return <PrivatePrayers />;
			case "Answered Prayers":
				return <Answered />;
			case "Settings":
				return <Settings />;
			default:
				console.log("You broke my app dummy!");
		}
	};

	return (
		<>
			<Header
				fliterMenu={fliterMenu}
				oldFirst={oldFirst}
				leastPrayed={leastPrayed}
				selection={selection}
			/>
			{componentSelector()}
			<Navigation selectString={selectCall} selection={selection} />
			{/* Sort/Filter Drawer */}
			<SwipeableDrawer
				sx={{
					"& .MuiDrawer-paper": {
						boxShadow: "none",
						bgcolor: "transparent",
					},
				}}
				anchor="bottom"
				open={fMenuOpen}
				onOpen={() => setFMenuOpen(true)}
				onClose={() => setFMenuOpen(false)}>
				<div className={headerStyles.swipeableDrawer}>
					{/* Top portion */}
					<div className={headerStyles.drawerTop}>
						<Button className={headerStyles.topBtn}>Reset</Button>
						<div className={headerStyles.blob}></div>
						<Button className={headerStyles.topBtn}>Apply</Button>
					</div>
					<div className={headerStyles.sortList}>
						<h3>Sort</h3>
						{/* New or Old */}
						<FormControl className={headerStyles.formControl}>
							<RadioGroup
								aria-labelledby="sort-by-oldest-or-newest"
								defaultValue="true"
								name="newestToOldest">
								<FormControlLabel
									value="true"
									control={
										<Radio
											sx={{
												width: "48px",
												height: "48px",
												color: "var(--sys-light-on-surface-variant)",
												"&.Mui-checked": {
													color: "var(--sys-light-primary)",
												},
											}}
										/>
									}
									label="Newest First"
								/>
								<FormControlLabel
									value="false"
									control={
										<Radio
											sx={{
												width: "48px",
												height: "48px",
												color: "var(--sys-light-on-surface-variant)",
												"&.Mui-checked": {
													color: "var(--sys-light-primary)",
												},
											}}
										/>
									}
									label="Oldest First"
								/>
							</RadioGroup>
						</FormControl>
						<FormControl className={headerStyles.formControl}>
							<RadioGroup
								aria-labelledby="sort-by-most-or-least-prayed"
								defaultValue="null"
								name="mostToLeast">
								<FormControlLabel
									value="true"
									control={
										<Radio
											sx={{
												width: "48px",
												height: "48px",
												color: "var(--sys-light-on-surface-variant)",
												"&.Mui-checked": {
													color: "var(--sys-light-primary)",
												},
											}}
										/>
									}
									label="Most Prayed For (by me)"
								/>
								<FormControlLabel
									value="false"
									control={
										<Radio
											sx={{
												width: "48px",
												height: "48px",
												color: "var(--sys-light-on-surface-variant)",
												"&.Mui-checked": {
													color: "var(--sys-light-primary)",
												},
											}}
										/>
									}
									label="Least Prayed For (by me)"
								/>
							</RadioGroup>
						</FormControl>
					</div>
					{/* Filter section */}
					<div className={headerStyles.filterList}>
						<h3>Filter</h3>
						{/* Person */}
						<div className={customRadios.radio}>
							<input
								type="radio"
								name="person"
								id="otherPrayers"
								value="false"
								className={customRadios.radioInput}
								// checked={inSelected(false)}
								// onChange={handleCheckedIn}
							/>
							<label htmlFor="otherPrayers" className={customRadios.radioLabel}>
								Others&#39; Prayers
							</label>
							<input
								type="radio"
								name="person"
								id="myPrayers"
								value="true"
								className={customRadios.radioInput}
								// checked={inSelected(true)}
								// onChange={handleCheckedIn}
							/>
							<label htmlFor="myPrayers" className={customRadios.radioLabel}>
								My Prayers
							</label>
						</div>
						{/* With name */}
						<div className={customRadios.radio}>
							<input
								type="radio"
								name="privacy"
								id="anonymous"
								value="false"
								className={customRadios.radioInput}
								// checked={inSelected(false)}
								// onChange={handleCheckedIn}
							/>
							<label htmlFor="anonymous" className={customRadios.radioLabel}>
								Anonymous
							</label>
							<input
								type="radio"
								name="privacy"
								id="public"
								value="true"
								className={customRadios.radioInput}
								// checked={inSelected(true)}
								// onChange={handleCheckedIn}
							/>
							<label htmlFor="public" className={customRadios.radioLabel}>
								Public
							</label>
						</div>
					</div>
				</div>
			</SwipeableDrawer>
		</>
	);
}
