import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { Button, OutlinedInput } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { auth } from "@/firebase/firebaseApp";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/slices/userSlice";

export default function UserNameForm() {
	const [name, setName] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validation
		if (!name) {
			toast.error("Name is required.");
			return;
		}
		// Add UserName to firebase displayName
		updateProfile(auth.currentUser, {
			displayName: name,
		})
			.then(() => {
				dispatch(
					userLoggedIn({
						name: name,
					})
				);
				toast.success(`Thank you! You are now logged in as ${name}`);
			})
			.then(() => {
				router.push("/home");
			})
			.catch((error) => {
				toast.error("Update profile error");
				console.log("update profile error: ", error);
			});
	};
	return (
		<form onSubmit={handleSubmit} className={styles.formInputContainer}>
			<OutlinedInput
				id="nameInput"
				placeholder="Name"
				className={styles.formInputField}
				type="name"
				value={name}
				onChange={(text) => setName(text.target.value)}
				startAdornment={
					<InputAdornment position="start">
						<PersonOutlineOutlinedIcon className={styles.formInputIcon} />
					</InputAdornment>
				}
			/>
			<Button type="submit" className={styles.startBtn}>
				Create Account
			</Button>
		</form>
	);
}
