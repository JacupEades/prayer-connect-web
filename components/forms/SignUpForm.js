import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { Button, TextField } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { auth } from "../../firebase/firebaseApp";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/slices/userSlice";
import { addUser } from "@/lib/userHelper";

export default function SignUpForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validation
		if (!name || !email || !password) {
			toast.error("Name, Email, and Password are required.");
			return;
		}
		if (password.length < 8) {
			toast.error("Password must be at least 8 characters.");
			return;
		}

		// Firebase new user
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Get user information
				const user = userCredential.user;
				// Create user in database
				addUser({
					uid: user.uid,
					name: name,
					email: email,
					role: "user",
					language: "English",
				});
				// Set firebase display name
				updateProfile(auth.currentUser, {
					displayName: name,
				});

				// Email registered notification
				toast.success(`Email ${email} is now a user.`);
				// Redux store
				dispatch(
					userLoggedIn({
						name: name,
						email: user.email,
						role: "user",
						uid: user.uid,
					})
				);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				// Email not registered notification
				if (errorCode === "auth/email-already-in-use") {
					toast.error("Email already in use. Please log in here.");
					router.push("/login/existing-user");
				}
				setPassword("");
				return;
			});
		// Clear password state
		setPassword("");
	};

	return (
		<form onSubmit={handleSubmit} className={styles.formInputContainer}>
			<TextField
				label={name !== "" ? "Name" : ""}
				id="nameInput"
				placeholder="Name"
				className={styles.formInputField}
				sx={{
					"& .MuiInputLabel-root.Mui-focused": {
						color: "var(--sys-light-primary)",
					},
					"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "var(--sys-light-primary)",
						},
				}}
				type="name"
				value={name}
				onChange={(text) => setName(text.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PersonOutlineOutlinedIcon className={styles.formInputIcon} />
						</InputAdornment>
					),
				}}
			/>
			<div>
				<TextField
					label={email !== "" ? "Email" : ""}
					id="emailInput"
					placeholder="Email"
					className={styles.formInputField}
					sx={{
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--sys-light-primary)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--sys-light-primary)",
							},
					}}
					type="email"
					value={email}
					onChange={(text) => setEmail(text.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<EmailOutlinedIcon className={styles.formInputIcon} />
							</InputAdornment>
						),
					}}
				/>
				{email !== "" ? (
					<p className={styles.emailWarning}>
						Email cannot be changed after sign up
					</p>
				) : (
					<></>
				)}
			</div>
			<TextField
				label={password !== "" ? "Password" : ""}
				id="passwordInput"
				placeholder="Password"
				className={styles.formInputField}
				sx={{
					"& .MuiInputLabel-root.Mui-focused": {
						color: "var(--sys-light-primary)",
					},
					"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							borderColor: "var(--sys-light-primary)",
						},
				}}
				type="password"
				value={password}
				onChange={(text) => setPassword(text.target.value)}
				autoComplete="newPassword"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<LockOutlinedIcon className={styles.formInputIcon} />
						</InputAdornment>
					),
				}}
			/>
			<Button type="submit" className={styles.startBtn}>
				Create Account
			</Button>
		</form>
	);
}
