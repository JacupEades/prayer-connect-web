import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import LoginForm from "../../../components/forms/LoginForm";
import React, { useEffect, useState } from "react";
import {
	ActionCodeSettings,
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithPopup,
} from "firebase/auth";
import { provider, auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userLoggedIn } from "@/redux/slices/userSlice";
import { OutlinedInput } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			!user ? null : router.push("/home");
		});
		console.log("logged in check pushed you home");
	}, [router]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
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
				<Button type="submit" className={styles.startBtn} disabled={!email}>
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
