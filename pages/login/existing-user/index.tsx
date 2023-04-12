import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { Button } from "@mui/material";
import LoginForm from "../../../components/forms/LoginForm";

export default function existingUser() {
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Welcome back!</h1>
			{LoginForm()}
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
