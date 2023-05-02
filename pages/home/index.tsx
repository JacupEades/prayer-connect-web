import React, { useEffect, useState } from "react";
import Navigation from "@/components/overlays/Navigation";
import Header from "@/components/overlays/Header";
import Community from "@/components/sections/Community";
import Answered from "@/components/sections/Answered";
import PrivatePrayers from "@/components/sections/PrivatePrayers";
import Settings from "@/components/sections/Settings";
import FilterDrawer from "@/components/forms/FilterDrawer";

type Props = {};

export default function HomePage({}: Props) {
	// Navigation tab selection
	const [selection, setSelection] = useState("Community Prayers");
	// Drawer open
	const [fMenuOpen, setFMenuOpen] = useState(false);
	// Sort right now can only take one value
	const [sortValue, setSortValue] = useState("newest");
	const [sortApplied, setSortApplied] = useState(false);
	// Filter Values
	const [whoValue, setWhoValue] = useState("all");
	const [namedValue, setNamedValue] = useState("both");

	// Usefull for checking the filter states
	// useEffect(() => {
	// 	console.log(
	// 		"sortApplied:",
	// 		sortApplied,
	// 		"sortValue:",
	// 		sortValue,
	// 		"whoValue:",
	// 		whoValue,
	// 		"namedValue:",
	// 		namedValue
	// 	);
	// }, [namedValue, sortApplied, sortValue, whoValue]);

	// functions for the Header
	const filterMenu = () => {
		setFMenuOpen(!fMenuOpen);
	};
	// defaults sort shorthands
	const sortBase = sortValue === "newest";
	const sortNotBase = sortValue !== "newest";
	const oldestSeleted = sortValue === "oldest";
	const mostSeleted = sortValue === "mostPrayers";
	const leastSeleted = sortValue === "leastPrayers";
	// defaults filter shorthands
	const baseWhoValue = whoValue === "all";
	const notBaseWhoValue = whoValue !== "all";
	const baseNamedValue = namedValue === "both";
	const notBaseNamedValue = namedValue !== "both";
	// Sorts
	const oldFirst = () => {
		if (oldestSeleted && baseWhoValue && baseNamedValue) {
			setSortValue("newest");
			setSortApplied(false);
		} else if (
			(oldestSeleted && notBaseWhoValue && notBaseNamedValue) ||
			(oldestSeleted && notBaseWhoValue && baseNamedValue) ||
			(oldestSeleted && baseWhoValue && notBaseNamedValue)
		) {
			setSortValue("newest");
		} else {
			setSortValue("oldest");
			setSortApplied(true);
		}
	};
	const mostPrayed = () => {
		if (mostSeleted && baseWhoValue && baseNamedValue) {
			setSortValue("newest");
			setSortApplied(false);
		} else if (
			(mostSeleted && notBaseWhoValue) ||
			(mostSeleted && notBaseNamedValue)
		) {
			setSortValue("newest");
		} else {
			setSortValue("mostPrayers");
			setSortApplied(true);
		}
	};
	const leastPrayed = () => {
		if (leastSeleted && baseWhoValue && baseNamedValue) {
			setSortValue("newest");
			setSortApplied(false);
		} else if (
			(leastSeleted && notBaseWhoValue) ||
			(leastSeleted && notBaseNamedValue)
		) {
			setSortValue("newest");
		} else {
			setSortValue("leastPrayers");
			setSortApplied(true);
		}
	};
	// Filters
	const otherChip = () => {
		if (sortBase && notBaseWhoValue && baseNamedValue) {
			setWhoValue("all");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && baseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue)
		) {
			setWhoValue("all");
		} else {
			setWhoValue("other");
			setSortApplied(true);
		}
	};
	const mineChip = () => {
		if (sortBase && notBaseWhoValue && baseNamedValue) {
			setWhoValue("all");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && baseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue)
		) {
			setWhoValue("all");
		} else {
			setWhoValue("mine");
			setSortApplied(true);
		}
	};
	const anonChip = () => {
		if (sortBase && baseWhoValue && notBaseNamedValue) {
			setNamedValue("both");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && baseWhoValue && notBaseNamedValue)
		) {
			setNamedValue("both");
		} else {
			setNamedValue("anon");
			setSortApplied(true);
		}
	};
	const publicChip = () => {
		if (sortBase && baseWhoValue && notBaseNamedValue) {
			setNamedValue("both");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && baseWhoValue && notBaseNamedValue)
		) {
			setNamedValue("both");
		} else {
			setNamedValue("public");
			setSortApplied(true);
		}
	};

	const componentSelector = () => {
		switch (selection) {
			case "Community Prayers":
				return (
					<Community
						sortValue={sortValue}
						whoValue={whoValue}
						namedValue={namedValue}
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

	// functions for the navigation
	const selectCall = (data: string) => {
		setSelection(data);
	};

	return (
		<>
			<Header
				filterMenu={filterMenu}
				// sort funcs
				oldFirst={oldFirst}
				mostPrayed={mostPrayed}
				leastPrayed={leastPrayed}
				// filter funcs
				otherChip={otherChip}
				mineChip={mineChip}
				anonChip={anonChip}
				publicChip={publicChip}
				// other
				selection={selection}
				sortValue={sortValue}
				whoValue={whoValue}
				namedValue={namedValue}
				sortApplied={sortApplied}
			/>
			{componentSelector()}
			<Navigation selectString={selectCall} selection={selection} />
			{/* Sort/Filter Drawer */}
			<FilterDrawer
				fMenuOpen={fMenuOpen}
				filterMenu={filterMenu}
				setSortValue={setSortValue}
				setWhoValue={setWhoValue}
				setNamedValue={setNamedValue}
				setSortApplied={setSortApplied}
				sortApplied={sortApplied}
			/>
		</>
	);
}
