import styles from "@/styles/Login.module.css";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InputAdornment from "@mui/material/InputAdornment";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!email) {
			return toast.error("Email must be provided.");
		}

		sendPasswordResetEmail(auth, email, {
			url: "https://prayer-connect-web.vercel.app/login/existing-user",
			handleCodeInApp: true,
		})
			.then(() => {
				toast.success(`Password reset email has been sent to ${email}.`);
				router.push("/login/existing-user");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Forgot Password</h1>
			<form onSubmit={handleSubmit} className={styles.formInputContainer}>
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
