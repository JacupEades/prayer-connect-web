import React, { useReducer } from "react";
import styles from "@/styles/Nav.module.css";
import { AiOutlineSend } from "react-icons/ai";
import PrayerCard from "@/components/PrayerCard";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, updateAction } from "@/redux/reducer";

export default function Navigation() {
	const formId = useSelector((state) => state.app.client.formId);
	const visible = useSelector((state) => state.app.client.toggleFormVisible);
	const dispatch = useDispatch();

	const handleAddPrayer = () => {
		// console.log(formId);
		// dispatch(toggleChangeAction(formId));
		if (visible && formId !== undefined) {
			dispatch(updateAction(undefined));
			dispatch(toggleChangeAction());
		} else if (visible && formId === undefined) {
			dispatch(toggleChangeAction());
		} else if (!visible && formId !== undefined) {
			dispatch(updateAction(undefined));
			dispatch(toggleChangeAction());
		} else if (visible) {
			dispatch(updateAction(undefined));
		} else {
			dispatch(toggleChangeAction());
		}
	};

	return (
		<nav className={styles.navMasterContainer}>
			<button onClick={handleAddPrayer} className={styles.btn}>
				Add prayer
			</button>
			<div className={styles.btn}>Nav2</div>
			<div className={styles.btn}>Nav3</div>
			<div className={styles.btn}>Nav4</div>
		</nav>
	);
}
