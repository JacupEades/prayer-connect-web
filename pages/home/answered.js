import React from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation.js";

export default function answered() {
	return (
		<>
			<Header />
			<div style={{ color: "black", margin: "25%" }}>Answered prayers</div>
			<Navigation />
		</>
	);
}
