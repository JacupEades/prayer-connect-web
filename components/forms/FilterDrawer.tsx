import React, { useEffect, useState } from "react";
import {
	Button,
	FormControl,
	FormControlLabel,
	RadioGroup,
	SwipeableDrawer,
} from "@mui/material";
import headerStyles from "@/styles/Header.module.css";
import Radio from "@mui/material/Radio";
import CheckIcon from "@mui/icons-material/Check";
import customRadios from "@/styles/PrayerPage.module.css";

type Props = {
	fMenuOpen: boolean;
	filterMenu: any;
	oldFirst: any;
	leastPrayed: any;
	selection: any;
	sortValue: string;
	setSortValue: any;
};

export default function FilterDrawer({
	fMenuOpen,
	filterMenu,
	oldFirst,
	leastPrayed,
	selection,
	sortValue,
	setSortValue,
}: Props) {
	// Filters (who's)
	const [filterOther, setFilterOther] = useState(false);
	const [filterMine, setFilterMine] = useState(false);
	// (Name given)
	const [filterNoName, setFilterNoName] = useState(false);
	const [filterNamed, setFilterNamed] = useState(false);
	const [formData, setFormData] = useState({
		sort: "newest",
		who: true,
		loctaion: true,
	});

	// Drawer utiliies
	useEffect(() => {
		setFormData({
			sort: sortValue,
			who: true,
			loctaion: true,
		});
	}, [sortValue]);

	// Drawer Utilies
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("formData: ", formData);
		sortSelector();
	};
	const handleSort = (e: any) => {
		e.preventDefault();
		setSortValue(e.target.value);
	};

	const sortSelector = () => {
		console.log("sort value: ", sortValue);
		switch (sortValue) {
			case "newest":
				return setSortValue(sortValue);
			case "oldest":
				return setSortValue(sortValue);
			case "mostPrayers":
				return setSortValue(sortValue);
			case "leastPrayers":
				return setSortValue(sortValue);
			default:
				console.log("Sort Select error!");
		}
	};
	// Filter clicked's
	const clickWho1 = () => {
		if (filterOther === true) {
			setFilterOther(false);
		} else {
			setFilterOther(true);
			setFilterMine(false);
		}
	};
	const clickWho2 = () => {
		if (filterMine === true) {
			setFilterMine(false);
		} else {
			setFilterOther(false);
			setFilterMine(true);
		}
	};

	const clickNamed1 = () => {
		if (filterNoName === true) {
			setFilterNoName(false);
		} else {
			setFilterNoName(true);
			setFilterNamed(false);
		}
	};
	const clickNamed2 = () => {
		if (filterNamed === true) {
			setFilterNamed(false);
		} else {
			setFilterNoName(false);
			setFilterNamed(true);
		}
	};

	return (
		<SwipeableDrawer
			sx={{
				"& .MuiDrawer-paper": {
					boxShadow: "none",
					bgcolor: "transparent",
				},
			}}
			anchor="bottom"
			open={fMenuOpen}
			onOpen={() => filterMenu()}
			onClose={() => filterMenu()}>
			<form onSubmit={handleSubmit}>
				<div className={headerStyles.swipeableDrawer}>
					{/* Top portion */}
					<div className={headerStyles.drawerTop}>
						<Button className={headerStyles.topBtn}>Reset</Button>
						<div className={headerStyles.blob}></div>
						<Button type="submit" className={headerStyles.topBtn}>
							Apply
						</Button>
					</div>
					<div className={headerStyles.sortList}>
						<h3>Sort</h3>
						{/* New or Old */}
						<FormControl className={headerStyles.formControl}>
							<RadioGroup
								aria-labelledby="sort-by-oldest-newest-or-prayers"
								value={sortValue}
								onChange={handleSort}
								name="sortAndFilter">
								<FormControlLabel
									value="newest"
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
									value="oldest"
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
								<FormControlLabel
									value="mostPrayers"
									control={
										<Radio
											// disabled
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
									value="leastPrayers"
									control={
										<Radio
											// disabled
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
						{/* whos */}
						<div className={customRadios.radio}>
							<input
								type="radio"
								name="who"
								id="otherPrayers"
								value="Others Prayers"
								className={customRadios.radioInput}
								checked={filterOther}
								onClick={clickWho1}
								onChange={() => console.log("Filter: other prayers")}
							/>
							<label htmlFor="otherPrayers" className={customRadios.radioLabel}>
								{filterOther === true ? (
									<CheckIcon className={customRadios.toggleIcon} />
								) : (
									""
								)}
								Others&#39; Prayers
							</label>
							<input
								type="radio"
								name="who"
								id="myPrayers"
								value="My Prayers"
								className={customRadios.radioInput}
								checked={filterMine}
								onClick={clickWho2}
								onChange={() => console.log("Filter: my prayers")}
							/>
							<label htmlFor="myPrayers" className={customRadios.radioLabel}>
								{filterMine === true ? (
									<CheckIcon className={customRadios.toggleIcon} />
								) : (
									""
								)}
								My Prayers
							</label>
						</div>
						{/* With name */}
						<div className={customRadios.radio}>
							<input
								type="radio"
								name="named"
								id="anonymous"
								value="noName"
								className={customRadios.radioInput}
								checked={filterNoName}
								onClick={clickNamed1}
								onChange={() => console.log("Filter: No name")}
							/>
							<label htmlFor="anonymous" className={customRadios.radioLabel}>
								{filterNoName === true ? (
									<CheckIcon className={customRadios.toggleIcon} />
								) : (
									""
								)}
								Anonymous
							</label>
							<input
								type="radio"
								name="named"
								id="public"
								value="public"
								className={customRadios.radioInput}
								checked={filterNamed}
								onClick={clickNamed2}
								onChange={() => console.log("Filter: Public")}
							/>
							<label htmlFor="public" className={customRadios.radioLabel}>
								{filterNamed === true ? (
									<CheckIcon className={customRadios.toggleIcon} />
								) : (
									""
								)}
								Public
							</label>
						</div>
					</div>
				</div>
			</form>
		</SwipeableDrawer>
	);
}
