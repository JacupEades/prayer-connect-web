import { Button } from "@mui/material";
import styles from "@/styles/Settings.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteConfirm from "@/components/overlays/DeleteConfirm";
import { useRouter } from "next/router";

type Props = {};

export default function Account({}: Props) {
	const [deletePopup, setDeletePopup] = useState(false);

	const router = useRouter();
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	// Delete Account
	const handleDelete = () => {
		setDeletePopup(true);
	};

	const deleteConfirmed = async () => {
		try {
			setDeletePopup(false);
			console.log("deleteConfirmed ran");
		} catch {
			console.log("deleteConfirmed Error");
		}
	};

	return (
		<main className={styles.accountMain}>
			{deletePopup ? (
				<DeleteConfirm
					deletePopup={deletePopup}
					deleteConfirmed={deleteConfirmed}
					setDeletePopup={setDeletePopup}
					deleteWhat="Account"
				/>
			) : (
				""
			)}
			<SettingsHeaders title="Account" />
			<div className={styles.accountCardMain}>
				{/* Name */}
				<Button
					onClick={() => router.push("/home/settings/account/change-name")}
					className={styles.accountCardTop}>
					<p className={styles.accountCardP}>Name</p>
					<div className={styles.accountCardRight}>
						<p className={styles.accountCardP}>Jacob Eades</p>
						<ArrowForwardIosIcon className={styles.accountCardIcon} />
					</div>
				</Button>
				{/* Email */}
				<Button className={styles.accountCardMid}>
					<p className={styles.accountCardP}>Email</p>
					<div className={styles.accountCardRight}>
						<p className={styles.accountCardP}>jacob.eades@gmail.com</p>
					</div>
				</Button>
				{/* Password */}
				<Button
					onClick={() => router.push("/login/forgot-password")}
					className={styles.accountCardBot}>
					<p className={styles.accountCardP}>Password</p>
					<div className={styles.accountCardRight}>
						<p className={styles.accountCardP}>Reset</p>
						<ArrowForwardIosIcon className={styles.accountCardIcon} />
					</div>
				</Button>
			</div>
			<Button onClick={handleDelete} className={styles.deleteBtn}>
				Delete Account
			</Button>
		</main>
	);
}
