import React, { useState, useReducer, useEffect } from "react";
import styles from "@/styles/Login.module.css";
import { Button, OutlinedInput } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";

export default function LoginForm() {
	const [email, setEmail] = useState("jwae98@gmail.com");
	const [password, setPassword] = useState("123456");

	const handleSubmit = async (e) => {
		e.preventDefault();
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
