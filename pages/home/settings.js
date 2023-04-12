import React from "react";
import router from "next/router";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation.js";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function settings() {
	const dispatch = useDispatch();

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logged Out");
				router.push("/login/existing-user");
			})
			.catch((error) => {
				toast.error("User Log Out failed: ", { error });
			});
	};

	return (
		<>
			<Header />
			<div style={{ color: "black", margin: "25%" }}>Settings</div>
			<Button onClick={logout} variant="outlined">
				Sign Out
			</Button>
			<Navigation />
		</>
	);
}
