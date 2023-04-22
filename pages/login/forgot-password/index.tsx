import styles from "@/styles/Login.module.css";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { OutlinedInput } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { userLoggedIn } from "@/redux/slices/userSlice";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	// kick out logged in users who are logged in
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// Redux store
				dispatch(
					userLoggedIn({
						name: user.displayName,
						email: user.email,
						role: "admin",
						uid: user.uid,
					})
				);
			}
			if (user && user.uid) {
				router.push("/home");
			} else {
				console.log("User is null");
			}
		});
		console.log("logged in check pushed you home");
	}, [dispatch, router]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!email) {
			return toast.error("Email must be provided.");
		}
		sendPasswordResetEmail(auth, email, {
			url: "https://prayer-connect-web.vercel.app/login/existing-user",
			handleCodeInApp: true,
		});
		toast.success(`Password reset email has been sent to ${email}.`);
		router.push("/login/existing-user");
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Forgot Password</h1>
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
				<Button type="submit" className={styles.startBtn}>
					Send password recovery email
				</Button>
			</form>
			<div className={styles.orSeperator}>
				<div></div>
				<p>or</p>
				<div></div>
			</div>
			<div className={styles.loginBtnContainer}>
				<p>Don&#39;t have an account yet?</p>
				<Button href="/login/signup" className={styles.loginBtn}>
					Create Account
				</Button>
			</div>
		</main>
	);
}
