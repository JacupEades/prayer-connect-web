import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import LoginForm from "../../../components/forms/LoginForm";
import React, { useEffect } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { userLoggedIn } from "@/redux/slices/userSlice";
import Link from "next/link";
import { addUser } from "@/lib/userHelper";
import { resetCommunity } from "@/redux/slices/communitySlice";

export default function ExistingUser() {
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = getAuth();

	useEffect(() => {
		dispatch(resetCommunity());
	}, [dispatch]);

	const handleGoogle = async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;
				const currentUserName: any = auth.currentUser?.displayName;
				addUser({
					uid: user.uid,
					name: currentUserName,
					email: user.email,
					role: "user",
					language: "English",
				});
				dispatch(
					userLoggedIn({
						name: currentUserName,
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
				return;
			});
	};
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Welcome back!</h1>
			{LoginForm()}
			<p className={styles.terms}>
				<Link href="/login/forgot-password">Forgot your password?</Link>
			</p>
			<div className={styles.orSeperator}>
				<div></div>
				<p>or</p>
				<div></div>
			</div>

			<div className={styles.startBtnContainer}>
				<Button onClick={handleGoogle} className={styles.altSignBtn}>
					<Image
						src={"/google_icon.svg"}
						alt={"Google"}
						height={18}
						width={18}
					/>
					Log in with Google
				</Button>
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
