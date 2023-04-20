import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css";
import { Button, OutlinedInput } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { auth } from "../../firebase/firebaseApp";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/slices/userSlice";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	// kick out logged in users who are logged in
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			!user ? null : router.push("/home");
		});
		console.log("logged in check pushed you home");
	}, [router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Validation
		if (!email || !password) {
			toast.error("Email and Password are required.");
			return;
		}
		if (password.length < 8) {
			toast.error("Password incorrect.");
			return;
		}

		// Firebase new user
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Get user information
				const user = userCredential.user;
				const idTokenResult = user.getIdTokenResult();
				console.log("token:", idTokenResult.token);

				// Redux store
				dispatch(
					userLoggedIn({
						name: user.displayName,
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
				toast.error(errorMessage);
				setPassword("");
				return;
			});
		// Clear password state
		setPassword("");
	};

	return (
		<form onSubmit={handleSubmit} className={styles.formInputContainer}>
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
				Log in
			</Button>
		</form>
	);
}
