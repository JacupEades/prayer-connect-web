import React from "react";
import router from "next/router";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/slices/userSlice";

export default function Settings() {
	const dispatch = useDispatch();

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logged Out");
				dispatch(userLoggedOut());
				router.push("/login/existing-user");
			})
			.catch((error) => {
				toast.error("User Log Out failed: ", { error });
			});
	};

	return (
		<>
			<Button
				style={{ color: "black", margin: "25%" }}
				onClick={logout}
				variant="outlined">
				Sign Out
			</Button>
		</>
	);
}
