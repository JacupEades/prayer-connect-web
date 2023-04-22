import React, { useState } from "react";
import Navigation from "@/components/overlays/Navigation";
import Header from "@/components/overlays/Header";
import Community from "@/components/sections/Community";
import Answered from "@/components/sections/Answered";
import PrivatePrayers from "@/components/sections/PrivatePrayers";
import Settings from "@/components/sections/Settings";

type Props = {};

export default function HomePage({}: Props) {
	const [selection, setSelection] = useState("Community Prayers");

	const selectCall = (data: string) => {
		setSelection(data);
	};
	const componentSelector = () => {
		switch (selection) {
			case "Community Prayers":
				return <Community />;
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
			<Header selection={selection} />
			{componentSelector()}
			<Navigation selectString={selectCall} selection={selection} />
		</>
	);
}
