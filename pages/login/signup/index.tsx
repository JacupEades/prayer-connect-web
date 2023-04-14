import React from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import SignUpForm from "../../../components/forms/SignUpForm";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { userLoggedIn } from "@/redux/slices/userSlice";

export default function NewUser() {
	const router = useRouter();
	const dispatch = useDispatch();
	const auth = getAuth();

	const handleGoogle = async () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential: any = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				const uEmail: any = user.email;

				toast.success(`Email ${uEmail} is now a user.`);
				dispatch(
					userLoggedIn({
						email: user.email,
						role: "admin",
						uid: user.uid,
						token: token,
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
			<h1 className={styles.h1}>Create an Account</h1>
			{SignUpForm()}
			<p className={styles.terms}>
				By signing up, I agree to <a>Terms and Conditions</a>
			</p>
			<div className={styles.orSeperator}>
				<div></div>
				<p>or</p>
				<div></div>
			</div>

			<div className={styles.startBtnContainer}>
				<Button onClick={handleGoogle} className={styles.altSigntBtn}>
					<Image
						src={"/google_icon.svg"}
						alt={"Google"}
						height={18}
						width={18}
					/>
					Sign up with Google
				</Button>
			</div>
			<div className={styles.loginBtnContainer}>
				<p>Already have an account?</p>
				<Button href="/login/existing-user" className={styles.loginBtn}>
					Log in
				</Button>
			</div>
		</main>
	);
}
