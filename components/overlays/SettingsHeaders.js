import { Button } from "@mui/material";
import styles from "@/styles/Settings.module.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from "next/router";

export default function SettingsHeaders(props) {
	const router = useRouter();
	return (
		<nav className={styles.settingsHeaderMain}>
			<Button onClick={() => router.back()} className={styles.headerBackBtn}>
				<ArrowBackOutlinedIcon className={styles.headerBackIcon} />
			</Button>
			<p className={styles.headerTitle}>{props.title}</p>
			<div className={styles.block}></div>
		</nav>
	);
}
