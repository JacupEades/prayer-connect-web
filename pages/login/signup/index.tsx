import React from "react";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import SignUpForm from "../../../components/forms/SignUpForm";

export default function NewUser() {
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
				<Button className={styles.altSigntBtn}>
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
