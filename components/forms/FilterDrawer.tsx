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
	setSortValue: any;
	setWhoValue: any;
	setNamedValue: any;
	setSortApplied: any;
	sortApplied: boolean;
};

export default function FilterDrawer({
	fMenuOpen,
	filterMenu,
	setSortValue,
	setWhoValue,
	setNamedValue,
	setSortApplied,
	sortApplied,
}: Props) {
	// Filters (who's)
	const [filterOther, setFilterOther] = useState(false);
	const [filterMine, setFilterMine] = useState(false);
	// (Name given)
	const [filterNoName, setFilterNoName] = useState(false);
	const [filterNamed, setFilterNamed] = useState(false);
	// Form Values
	const [formSort, setFormSort] = useState("newest");
	const [formWho, setFormWho] = useState("all");
	const [formName, setFormName] = useState("both");
	const [formData, setFormData] = useState({
		sort: "newest",
		who: "all",
		loctaion: "both",
	});

	// Drawer utiliies
	useEffect(() => {
		setFormData({
			sort: formSort,
			who: formWho,
			loctaion: formName,
		});
	}, [formName, formWho, formSort]);

	// Drawer Utilies
	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Change the default chips if there is any selection
		if (
			formData.sort === "newest" &&
			formData.who === "all" &&
			formData.loctaion === "both"
		) {
			setSortApplied(false);
		} else {
			setSortApplied(true);
		}
		// Form to the parent's state
		setSortValue(formData.sort);
		setWhoValue(formData.who);
		setNamedValue(formData.loctaion);
		// Close drawer
		filterMenu();
		// console.log("formData: ", formData);
	};
	const resetSortFilters = (e: any) => {
		e.preventDefault();
		// Form data
		setFormSort("newest");
		setFormWho("all");
		setFormName("both");
		// Filter Buttons
		setFilterOther(false);
		setFilterMine(false);
		setFilterNamed(false);
		setFilterNoName(false);
		// Default chips
		setSortApplied(false);
		// Parent state
		setSortValue("newest");
		setWhoValue("all");
		setNamedValue("both");
	};
	const handleSort = (e: any) => {
		e.preventDefault();
		setFormSort(e.target.value);
	};

	// Filter clicked's
	const clickWho1 = () => {
		if (filterOther === true) {
			setFilterOther(false);
			setFormWho("all");
		} else {
			setFilterOther(true);
			setFilterMine(false);
			setFormWho("other");
		}
	};
	const clickWho2 = () => {
		if (filterMine === true) {
			setFilterMine(false);
			setFormWho("all");
		} else {
			setFilterOther(false);
			setFilterMine(true);
			setFormWho("mine");
		}
	};

	const clickNamed1 = () => {
		if (filterNoName === true) {
			setFilterNoName(false);
			setFormName("both");
		} else {
			setFilterNoName(true);
			setFilterNamed(false);
			setFormName("anon");
		}
	};
	const clickNamed2 = () => {
		if (filterNamed === true) {
			setFilterNamed(false);
			setFormName("both");
		} else {
			setFilterNoName(false);
			setFilterNamed(true);
			setFormName("public");
		}
	};

	const noop = () => {};

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
						<Button onClick={resetSortFilters} className={headerStyles.topBtn}>
							Reset
						</Button>
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
								value={formSort}
								onChange={handleSort}
								name="sortAndFilter">
								<div className={headerStyles.defaultTag}>
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
									<p>(Default)</p>
								</div>
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
								onChange={() => noop()}
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
								onChange={() => noop()}
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
								onChange={() => noop()}
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
								onChange={() => noop()}
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
