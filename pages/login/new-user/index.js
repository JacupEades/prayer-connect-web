import Head from "next/head";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import { Button, OutlinedInput } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Password } from "@mui/icons-material";

const loginForm = () => (
	<form className={styles.formInputContainer}>
		{/* <PersonOutlineOutlinedIcon className={styles.formInputIcon} /> */}
		<OutlinedInput
			id="nameInput"
			placeholder="Name"
			className={styles.formInputField}
			startAdornment={
				<InputAdornment position="start">
					<PersonOutlineOutlinedIcon className={styles.formInputIcon} />
				</InputAdornment>
			}
		/>
		<OutlinedInput
			id="passwordInput"
			placeholder="Email"
			className={styles.formInputField}
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
			startAdornment={
				<InputAdornment position="start">
					<LockOutlinedIcon className={styles.formInputIcon} />
				</InputAdornment>
			}
		/>
		<Button href="/community" className={styles.startBtn}>
			Create Account
		</Button>
	</form>
);

export default function newUser() {
	return (
		<main className={styles.main}>
			<h1 className={styles.h1}>Create an Account</h1>
			{loginForm()}
			<p className={styles.terms}>
				By signing up, I agree to <a>Terms and Conditions</a>
			</p>
			<div className={styles.orSeperator}>
				<div></div>
				<p>or</p>
				<div></div>
			</div>

			<div className={styles.startBtnContainer}>
				<Button href="/community" className={styles.altSigntBtn}>
					<Image
						src={"/google_icon.svg"}
						alt={"Google"}
						height={18}
						width={18}
					/>
					Sign up with Google
				</Button>
				<Button href="/community" className={styles.altSigntBtn}>
					<Image
						src={"/wechat_icon.svg"}
						alt={"WeChat"}
						height={18}
						width={18}
					/>
					Sign up with WeChat
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
