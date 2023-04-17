import React from "react";
import stylesLogin from "@/styles/Login.module.css";
import styles from "@/styles/Settings.module.css";
import router from "next/router";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/slices/userSlice";
import SettingsNavCard from "../cards/SettingsNavCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function Settings() {
	const dispatch = useDispatch();

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success("Logged Out");
				dispatch(userLoggedOut());
				router.push("/login/existing-user");
			})
			.catch((error) => {
				toast.error("User Log Out failed: ", { error });
			});
	};

	return (
		<main className={styles.main}>
			<SettingsNavCard
				icon={<NotificationsOutlinedIcon />}
				text={"Prayer Reminder"}
				route={"/home/settings/prayer-reminder"}
			/>
			<SettingsNavCard
				icon={<PersonOutlinedIcon />}
				text={"Account"}
				route={"/home/settings/account"}
			/>
			<div className={stylesLogin.orSeperator}>
				<div></div>
			</div>

			<SettingsNavCard
				icon={<EmailOutlinedIcon />}
				text={"Prayer Reminder"}
				route={"/home/settings/support"}
			/>
			<div className={stylesLogin.loginBtnContainer}>
				<Button onClick={logout} className={stylesLogin.loginBtn}>
					Log out
				</Button>
			</div>
		</main>
	);
}
