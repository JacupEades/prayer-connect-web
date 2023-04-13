import React, { useState, useEffect } from "react";
import styles from "@/styles/Login.module.css";
import { Button, OutlinedInput } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { auth } from "../../firebase/firebaseApp";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/slices/userSlice";

export default function SignUpForm() {
	const [name, setName] = useState("Jacob Eades");
	const [email, setEmail] = useState("jwae98@gmail.com");
	const [password, setPassword] = useState("12345678");
	const router = useRouter();
	const dispatch = useDispatch();

	// kick out logged in users who are logged in
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			!user ? null : router.push("/home");
		});
		console.log("useEffect ran");
	}, [router]);

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
				// Set firebase display name
				updateProfile(auth.currentUser, {
					displayName: name,
				});

				const idTokenResult = user.getIdTokenResult();
				// Email registered notification
				toast.success(`Email ${email} is now a user.`);
				// Redux store
				dispatch(
					userLoggedIn({
						name: name,
						email: user.email,
						role: "admin",
						uid: user.uid,
						token: idTokenResult.token,
					})
				);
			})
			.then(
				// Send the user to the community page
				router.push("/home")
			)
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
			<OutlinedInput
				id="passwordInput"
				placeholder="Email"
				className={styles.formInputField}
				type="email"
				value={email}
				onChange={(text) => setEmail(text.target.value)}
				startAdornment={
					<InputAdornment position="start">
						<EmailOutlinedIcon className={styles.formInputIcon} />
					</InputAdornment>
				}
			/>
			<OutlinedInput
				id="passwordInput"
				placeholder="Password"
				className={styles.formInputField}
				type="password"
				value={password}
				onChange={(text) => setPassword(text.target.value)}
				autoComplete="newPassword"
				startAdornment={
					<InputAdornment position="start">
						<LockOutlinedIcon className={styles.formInputIcon} />
					</InputAdornment>
				}
			/>
			<Button type="submit" className={styles.startBtn}>
				Create Account
			</Button>
		</form>
	);
}
