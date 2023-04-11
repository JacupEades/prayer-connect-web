import React, { useReducer } from "react";
import styles from "@/styles/Nav.module.css";
import { AiOutlineSend } from "react-icons/ai";
import PrayerCard from "@/components/PrayerCard";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
// import { toggleChangeAction, updateAction } from "@/redux/reducer";
import GroupsIcon from "@mui/icons-material/Groups";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

export default function Navigation() {
	// const formId = useSelector((state) => state.app.client.formId);
	// const visible = useSelector((state) => state.app.client.toggleFormVisible);
	const dispatch = useDispatch();

	const handleAddPrayer = () => {
		// console.log(formId);
		// dispatch(toggleChangeAction(formId));
		// if (visible && formId !== undefined) {
		// 	dispatch(updateAction(undefined));
		// 	dispatch(toggleChangeAction());
		// } else if (visible && formId === undefined) {
		// 	dispatch(toggleChangeAction());
		// } else if (!visible && formId !== undefined) {
		// 	dispatch(updateAction(undefined));
		// 	dispatch(toggleChangeAction());
		// } else if (visible) {
		// 	dispatch(updateAction(undefined));
		// } else {
		// 	dispatch(toggleChangeAction());
		// }
	};

	return (
		<nav className={styles.navMasterContainer}>
			<Button className={styles.addBtn}>
				<AddIcon className={styles.addBtnIcon} />
			</Button>
			<div className={styles.navMainMasterContainer}>
				<div className={styles.navBtnContainer}>
					<Button
						href="/community"
						onClick={handleAddPrayer}
						className={styles.navBtn}>
						<GroupsIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Community</p>
				</div>
				<div className={styles.navBtnContainer}>
					<Button
						href="/answered"
						onClick={handleAddPrayer}
						className={styles.navBtn}>
						<SignLanguageIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Answered</p>
				</div>
				<div className={styles.navBtnContainer}>
					<Button
						href="/private-prayers"
						onClick={handleAddPrayer}
						className={styles.navBtn}>
						<PersonIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Private</p>
				</div>
				<div className={styles.navBtnContainer}>
					<Button
						href="/settings"
						onClick={handleAddPrayer}
						className={styles.navBtn}>
						<SettingsIcon className={styles.navBtnIcon} />
					</Button>
					<p className={styles.navBtnText}>Settings</p>
				</div>
			</div>
		</nav>
	);
}
