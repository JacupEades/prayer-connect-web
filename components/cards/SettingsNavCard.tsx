import React from "react";
import styles from "@/styles/Settings.module.css";
import { FaPray } from "react-icons/fa";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
	icon: any;
	text: String;
	route: URL;
};

export default function SettingsNavCard({ icon, text, route }: Props) {
	const router = useRouter();

	const hanldelClick = () => {
		router.push(route);
	};

	return (
		<div className={styles.settingsBtnContainer}>
			<Button className={styles.settingsBtn} onClick={hanldelClick}>
				<div className={styles.settingsBtnLeft}>
					{icon}

					<div className={styles.settingsBtnText}>{text}</div>
				</div>
				<NavigateNextIcon />
			</Button>
		</div>
	);
}
