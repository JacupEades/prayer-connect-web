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

	useEffect(() => {
		console.log("current sortValue: ", sortValue);
	}, [sortValue]);

	// functions for the Header
	const filterMenu = () => {
		setFMenuOpen(!fMenuOpen);
	};
	const oldFirst = () => {
		if (sortValue === "oldest") {
			setSortValue("newest");
		} else {
			setSortValue("oldest");
		}
	};
	const leastPrayed = () => {
		if (sortValue === "leastPrayers") {
			setSortValue("newest");
		} else {
			setSortValue("leastPrayers");
		}
	};
	const componentSelector = () => {
		switch (selection) {
			case "Community Prayers":
				return <Community filterMenu={filterMenu} sortValue={sortValue} />;
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
				oldFirst={oldFirst}
				leastPrayed={leastPrayed}
				selection={selection}
				sortValue={sortValue}
			/>
			{componentSelector()}
			<Navigation selectString={selectCall} selection={selection} />
			{/* Sort/Filter Drawer */}
			<FilterDrawer
				fMenuOpen={fMenuOpen}
				filterMenu={filterMenu}
				oldFirst={oldFirst}
				leastPrayed={leastPrayed}
				selection={selection}
				sortValue={sortValue}
				setSortValue={setSortValue}
			/>
		</>
	);
}
