import React from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation.js";

export default function settings() {
	return (
		<>
			<Header />
			<div style={{ color: "black", margin: "25%" }}>Settings</div>
			<Navigation />
		</>
	);
}
