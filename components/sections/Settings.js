import React from "react";
import stylesLogin from "@/styles/Login.module.css";
import styles from "@/styles/Settings.module.css";
import router from "next/router";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/slices/userSlice";
import SettingsNavCard from "../cards/SettingsNavCard";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function Settings() {
	const { user } = useSelector((state) => ({
		...state,
	}));
	const dispatch = useDispatch();

	const userId = user.uid;

	const logout = () => {
		if (userId !== "") {
			signOut(auth)
				.then(() => {
					toast.success("Logged Out");
					dispatch(userLoggedOut());
					router.push("/login/existing-user");
				})
				.catch((error) => {
					toast.error("User Log Out failed: ", { error });
				});
		} else {
			dispatch(userLoggedOut());
			router.push("/login/existing-user");
		}
	};

	return (
		<main className={styles.main}>
			<div className={styles.helloText}>Hello, {user.name}</div>
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
				text={"Help & Info"}
				route={"/home/settings/support"}
			/>
			<div className={stylesLogin.loginBtnContainer}>
				<Button onClick={logout} className={stylesLogin.loginBtn}>
					{userId === "" ? "Log in" : "Log out"}
				</Button>
			</div>
		</main>
	);
}
