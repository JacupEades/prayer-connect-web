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
	// Main menu filter state
	const [oldest, setOldest] = useState(true);
	const [sortLeast, setSortLeast] = useState(false);

	// functions for the Header
	const filterMenu = () => {
		setFMenuOpen(!fMenuOpen);
	};
	const oldFirst = () => {
		setOldest(!oldest);
	};
	const leastPrayed = () => {
		setSortLeast(!sortLeast);
	};
	const componentSelector = () => {
		switch (selection) {
			case "Community Prayers":
				return (
					<Community
						filterMenu={filterMenu}
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

	// functions for the navigation
	const selectCall = (data: string) => {
		setSelection(data);
	};

	// Sending the open close function to the drawer
	const openCall = () => {
		setFMenuOpen(!fMenuOpen);
	};

	return (
		<>
			<Header
				filterMenu={filterMenu}
				oldFirst={oldFirst}
				oldest={oldest}
				leastPrayed={leastPrayed}
				least={sortLeast}
				selection={selection}
			/>
			{componentSelector()}
			<Navigation selectString={selectCall} selection={selection} />
			{/* Sort/Filter Drawer */}
			<FilterDrawer
				fMenuOpen={fMenuOpen}
				filterMenu={filterMenu}
				oldFirst={oldFirst}
				oldest={oldest}
				leastPrayed={leastPrayed}
				least={sortLeast}
				selection={selection}
			/>
		</>
	);
}
