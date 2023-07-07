import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css";
import { Button, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { auth } from "../../firebase/firebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/slices/userSlice";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

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

				// Redux store
				dispatch(
					userLoggedIn({
						name: user.displayName,
						email: user.email,
						role: "admin",
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
				toast.error(errorMessage);
				setPassword("");
				return;
			});
		// Clear password state
		setPassword("");
	};

	return (
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
				type={showPassword ? "text" : "password"}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoComplete="newPassword"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<LockOutlinedIcon className={styles.formInputIcon} />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleTogglePasswordVisibility}
								edge="end">
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Button type="submit" className={styles.startBtn}>
				Log in
			</Button>
		</form>
	);
}
